import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  state = {
    currentPage: window.location.pathname,
  };

  handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const currentPage = event.currentTarget.getAttribute('href');
    this.setState({ currentPage });
  };

  render() {
    const { currentPage } = this.state;

    return (
      <header>
        <nav>
          <ul className="menu">
            <li>
              <NavLink
                to="/"
                end
                onClick={this.handleNavLinkClick}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={this.handleNavLinkClick}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add"
                onClick={this.handleNavLinkClick}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
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
  }
}

export default Header;
