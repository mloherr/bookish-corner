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

  // Guardar token en localStorage
  // localStorage.setItem('token', data.token);
  // localStorage.setItem('username', data.username);
  // localStorage.setItem('name', data.name);
};

const functionsToExport = {
  getBooks: getBooks,
  registerUser: registerUser,
  loginUser: loginUser,
};

export default functionsToExport;
