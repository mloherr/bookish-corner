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

const getMyBooks = async (token) => {
  console.log('Token enviado desde getMyBooks:', token);
  try {
    const response = await fetch(`${URL}/mybooks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching my books:', error);
    throw error;
  }
};

const functionsToExport = {
  getBooks: getBooks,
  registerUser: registerUser,
  loginUser: loginUser,
  getMyBooks: getMyBooks,
};

export default functionsToExport;
