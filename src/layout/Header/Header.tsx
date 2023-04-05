import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <header>
      <nav>
        <ul className="menu">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>
              Add
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="current-page">
        <span>Current page: </span>
        {currentPage === '/'
          ? 'Home'
          : currentPage.slice(1)[0].toUpperCase() + currentPage.slice(2)}
      </div>
    </header>
  );
};

export default Header;
