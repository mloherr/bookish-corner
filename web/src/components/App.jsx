import '../scss/App.scss';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../services/api';
import { useState, useEffect } from 'react';
// import PropTypes from "prop-types";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.getBooks().then((response) => {
      setBooks(response.books);
      console.log(response.books);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <Header />
      <Main books={books} />
      <Footer />
    </>
  );
}

// NombreDeMiComponente.propTypes = {
//   nombreDeMiPropDeTipoStringOpcional: PropTypes.string,
//   nombreDeMiPropDeTipoStringObligatoria: PropTypes.string.isRequired,
// };

export default App;
