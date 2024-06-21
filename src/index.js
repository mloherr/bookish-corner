const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const server = express();

server.use(cors());
server.use(express.json());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 30000,
  });
  connection.connect();
  return connection;
}

const port = process.env.PORT || 4002;
server.listen(port, () => {
  console.log('Server is running on port ' + port);
});

server.get('/book-list', async (req, res) => {
  const connection = await getDBConnection();
  const querySQL = 'SELECT * FROM bookslist';
  const [result] = await connection.query(querySQL);
  console.log(result);
  connection.end();
  res.json({
    books: result,
  });
});

const staticServer = './src/public-react';
server.use(express.static(staticServer));
