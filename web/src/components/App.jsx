import '../scss/App.scss';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
// import PropTypes from "prop-types";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

// NombreDeMiComponente.propTypes = {
//   nombreDeMiPropDeTipoStringOpcional: PropTypes.string,
//   nombreDeMiPropDeTipoStringObligatoria: PropTypes.string.isRequired,
// };

export default App;
