CREATE TABLE queue_messages (
  id SERIAL PRIMARY KEY,
  content TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'done'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
