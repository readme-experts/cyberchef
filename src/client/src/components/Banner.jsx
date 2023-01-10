import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <main className="container">
      <div className="banner">
        <h3>Cyberchef - light and easy to use cooking ideas app</h3>
        <p>Start now</p>
        <div className="banner__buttons">
          <Link to="/login" className="banner__href">Login</Link>
          <Link to="/register" className="banner__href">Register
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Banner;
