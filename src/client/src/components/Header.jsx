import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const user = useSelector(state => state.account.user);
  return (
    <header className='header'>
      <div className='header__left'>
        <Link to='/' class='header__logo_link'>
          <h3 className='header__logo'><span>Cyber</span>chef</h3>
        </Link>
      </div>
      <div className='header__right'>
        {user ? <Link className='header__logo_link' to={`/user/${user.id}`}>
          <p className='header__username'>{user.username}</p>
        </Link> :
          <Link to='/login' className='header__logo_link'>
            <p className='header__username'>Login</p>
          </Link>}
      </div>
    </header>
  );
}

export default Header;
