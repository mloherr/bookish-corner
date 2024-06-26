const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const generateToken = (payload) => {
  const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'secreto');
    return decoded;
  } catch (err) {
    return null;
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  req.user = decoded;
  next();
};

server.get('/book-list', async (req, res) => {
  const connection = await getDBConnection();
  const querySQL = 'SELECT * FROM bookslist';
  const [result] = await connection.query(querySQL);
  connection.end();
  res.json({
    books: result,
  });
});

server.post('/sign-up', async (req, res) => {
  try {
    const connection = await getDBConnection();
    const { userName, emailUser, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const querySQL =
      'INSERT INTO users (userName, emailUser, hashedPassword) VALUES ( ?, ?, ?)';

    await connection.query(querySQL, [userName, emailUser, hashedPassword]);
    res.status(201).send({ message: 'User registered successfully!' });
    connection.end();
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error registering user', error: error.message });
  }
});

server.post('/login', async (req, res) => {
  const connection = await getDBConnection();
  const { emailUser, password } = req.body;
  const querySQL = 'SELECT * FROM users WHERE emailUser = ?';

  const [result] = await connection.query(querySQL, emailUser);
  const user = result[0];

  connection.end();

  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.hashedPassword);

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      error: 'Credenciales inválidas',
    });
  } else {
    //datos User que tiene el token
    const userForToken = {
      username: user.userName,
      id: user.idUser,
    };

    //Crear el token para enviar al front
    const token = generateToken(userForToken);
    // localStorage.setItem('token', token);
    res.status(200).json({ token, username: user.username, name: user.name });
  }
});

// const staticServer = './src/public-react';
// server.use(express.static(staticServer));
