import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="header__menu">
        <a className="header__menu--link" href="">
          Home
        </a>
        <Link to="/signup" className="header__menu--link">
          Registrarse
        </Link>
        <Link to="/login" className="header__menu--link">
          Iniciar sesión
        </Link>
      </nav>
    </header>
  );
}

export default Header;
