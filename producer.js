const db = require('./db');

async function produce(conteudo) {
  await db.query('INSERT INTO queue_messages (content) VALUES ($1)', [conteudo]);
  console.log('Producing:', conteudo);
}

(async () => {
  for (let i = 1; i <= 5; i++) {
    await produce(`Mensagem ${i}`);
  }
})();
