import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import Logo from './logo/booksicon1.svg';
import { itemTotal } from './cartHelpers';
import './Navbar.css';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => (
  <header>
    <div class="logo">
      <img className="nav-img" alt="logo" src={Logo} />
    </div>
    <input type="checkbox" id="nav-toggle" class="nav-toggle" />
    <nav>
      <ul>
        <li>
          <Link to="/" style={isActive(history, '/')}>
            {' '}
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" style={isActive(history, '/shop')}>
            {' '}
            Shop
          </Link>
        </li>
        <li>
          <Link to="/cart" style={isActive(history, '/cart')}>
            {' '}
            Cart
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li>
            <Link
              to="/user/dashboard"
              style={isActive(history, '/user/dashboard')}
            >
              {' '}
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li>
            <Link
              to="/admin/dashboard"
              style={isActive(history, '/admin/dashboard')}
            >
              {' '}
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li>
              <Link to="/signin" style={isActive(history, '/signin')}>
                {' '}
                Sign In
              </Link>
            </li>
            <li>
              <Link style={isActive(history, '/signup')} to="/signup">
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li>
            <Link
              to="/"
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              {' '}
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
    <label for="nav-toggle" class="nav-toggle-label">
      {' '}
      <span> </span>
    </label>
  </header>
);

export default withRouter(Menu);
