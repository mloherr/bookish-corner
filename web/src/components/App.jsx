import '../scss/App.scss';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import api from '../services/api';
import localStorage from '../services/localStorage';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import PropTypes from "prop-types";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [userName, setUserName] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsLoading(true);
    api.getBooks().then((response) => {
      setBooks(response.books);
      console.log(response.books);
      setIsLoading(false);
    });
  }, []);

  const handleChangeName = (value) => {
    setUserName(value);
  };

  const handleChangeEmail = (value) => {
    setEmailUser(value);
  };

  const handleChangePassword = (value) => {
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUserData = { userName, emailUser, password };
      const response = await api.registerUser(newUserData);
      console.log(response);
    } catch (error) {
      console.error('Error registrando usuario:', error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userData = { emailUser, password };
      const response = await api.loginUser(userData);
      console.log('token?', response);

      if (response) {
        localStorage.set('token', response);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main books={books} />} />
        <Route
          path="/login"
          element={
            <Login
              handleChangeEmail={handleChangeEmail}
              emailUser={emailUser}
              handleChangePassword={handleChangePassword}
              password={password}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              handleChangeName={handleChangeName}
              userName={userName}
              handleChangeEmail={handleChangeEmail}
              emailUser={emailUser}
              handleChangePassword={handleChangePassword}
              password={password}
              handleSubmit={handleSubmit}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

// NombreDeMiComponente.propTypes = {
//   nombreDeMiPropDeTipoStringOpcional: PropTypes.string,
//   nombreDeMiPropDeTipoStringObligatoria: PropTypes.string.isRequired,
// };

export default App;
