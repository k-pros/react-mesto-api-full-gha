import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();

  function onSignOut() {
    localStorage.removeItem('token');
    props.onSignOutClick();
    navigate('/sign-in');
  }
  
  return (
    <header className="header">
      <div className="header__logo"></div>
    
      <div className='header__container'>
        <Routes>
          <Route path="/sign-up" element={
            <Link to="/sign-in" className="text-link link">Войти</Link> 
          }/>
          <Route path="/sign-in" element={
            <Link to="/sign-up" className="text-link link">Регистрация</Link> 
          }/>
          <Route path="/" element={
            <>
              <p className="header__user">{props.userEmail}</p>
              <Link onClick={onSignOut} to="/sign-out" className="header__link link">Выйти</Link>
            </> 
          }/>        
        </Routes>
      </div>
    </header>
  );
}

export default Header;