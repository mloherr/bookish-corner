import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ isAuthenticated }) {
  return (
    <header className="header">
      <nav className="header__menu">
        <a className="header__menu--link" href="">
          Home
        </a>
        {isAuthenticated ? (
          <>
            <Link to="/mybooks" className="header__menu--link">
              Mis libros
            </Link>
            <a>Cerrar Sesión</a>
          </>
        ) : (
          <>
            {' '}
            <Link to="/signup" className="header__menu--link">
              Registrarse
            </Link>
            <Link to="/login" className="header__menu--link">
              Iniciar sesión
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Header;
