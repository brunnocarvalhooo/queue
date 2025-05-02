const db = require('./db');

async function consume() {
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    const { rows } = await client.query(`
      UPDATE queue_messages
      SET status = 'processing'
      WHERE id = (
        SELECT id FROM queue_messages
        WHERE status = 'pending'
        ORDER BY created_at
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      )
      RETURNING *;
    `);

    if (rows.length === 0) {
      console.log('No pending messages.');
      await client.query('COMMIT');
      return;
    }

    const mensagem = rows[0];
    console.log('Comsuming:', mensagem.content);

    await new Promise(r => setTimeout(r, 1000));

    await client.query(
      'UPDATE queue_messages SET status = $1 WHERE id = $2',
      ['done', mensagem.id]
    );

    await client.query('COMMIT');
    console.log('Done:', mensagem.content);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error:', err);
  } finally {
    client.release();
  }
}

(async () => {
  while (true) {
    await consume();
    await new Promise(r => setTimeout(r, 2000));
  }
})();
