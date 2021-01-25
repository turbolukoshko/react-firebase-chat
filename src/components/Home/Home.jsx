import React from 'react';
import { Link } from 'react-router-dom';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../../routes';
import './Home.scss';

const Home = () => {
  return(
    <>
    <div className="home__wrapper">
      <div className="home">
        <h1 className="home__title">Welcome to chat</h1>
        <p className="home__description">If you are ready then let's get started</p>
        <Link className="home__link" to={LOGIN_ROUTE}>Let's go</Link>
      </div>
    </div>
    <footer className="home__footer">
      <p className="home__sign-in">
        Already have an account? <Link className="home__sign-in-link" to={LOGIN_ROUTE}>Sign in</Link>
      </p>
    </footer>
    </>
  );
}

export default Home;
