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
    console.error('Error verifying token:', err);
    return null;
  }
};

const authenticateToken = (req, res, next) => {
  console.log('prueba funcion authenticate');
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const decoded = verifyToken(token);
  console.log('Decoded token:', decoded);

  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  console.log('req.user:', decoded);
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

server.get('/mybooks', authenticateToken, async (req, res) => {
  try {
    console.log('User ID from token:', req.user.id);
    const connection = await getDBConnection();
    const querySQL =
      'SELECT bookslist.* FROM bookslist JOIN users_has_bookslist ON bookslist.id = users_has_bookslist.fk_booksId WHERE users_has_bookslist.fk_usersId = ?';
    const [result] = await connection.query(querySQL, [req.user.id]);
    connection.end();
    res.json({
      myBooks: result,
    });
  } catch (error) {
    console.error('Error fetching my books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
  connection.end();
  if (result.length === 0) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const user = result[0];
  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordCorrect) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const userForToken = {
    username: user.userName,
    id: user.idUser,
  };

  const token = generateToken(userForToken);
  res.status(200).json({ token });
});

server.put('/logout', async (req, res) => {
  const authHeader = req.headers['authorization'];
  jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ message: 'Has sido desconectado' });
    } else {
      res.send({ message: 'Error' });
    }
  });
});

// const staticServer = './src/public-react';
// server.use(express.static(staticServer));
