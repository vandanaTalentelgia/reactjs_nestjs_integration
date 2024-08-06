import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/download.jpeg'
const Header =()=> {
  return (
    <>
      <header>

        <div className='container-fluid'>
          <nav className='navbarHeader'>
            <div className='logo'>
              <a href='/'><img src={logo}  alt='logo' /></a>
            </div>
            <div className='navigation clearfix'>
              <ul className='clearfix'>
              <li><Link to='/'>Log In</Link></li>
                <li><Link to='/register'>Sign Up</Link></li>
                
              </ul>
            </div>
          </nav>
        </div>
      </header>

    </>
  );
}

export default Header;