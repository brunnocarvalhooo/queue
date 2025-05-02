No terminal execute: 
  npm install

Execute o seguinte script sql:
  CREATE TABLE queue_messages (
    id SERIAL PRIMARY KEY,
    content TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'done'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

Crie o arquivo .env seguindo .env.sample:
  DB_USER=
  DB_PASSWORD=
  DB_NAME=
  DB_HOST=
  DB_PORT=

No terminal execute o produtor:
  node producer.js
  
No terminal execute o consumidor:
  node consumer.js

O consumidor roda em loop contínuo, verificando novas mensagens a cada 2 segundos.

Caso queira gerar mais mensagens, execute o produtor novamente
