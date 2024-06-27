const URL = 'http://localhost:3000';
// import localStorage from './localStorage.js';

const getBooks = () => {
  // Llamamos a la API
  return fetch(`${URL}/book-list`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const registerUser = (data) => {
  return fetch(`${URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const loginUser = (data) => {
  return fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getMyBooks = () => {
  // Llamamos a la API
  return fetch(`${URL}/my-books`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const functionsToExport = {
  getBooks: getBooks,
  registerUser: registerUser,
  loginUser: loginUser,
  getMyBooks: getMyBooks,
};

export default functionsToExport;
