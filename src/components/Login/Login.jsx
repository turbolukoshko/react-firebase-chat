import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../../helpers/auth';
import { SIGN_UP_ROUTE } from '../../routes';
import './Login.scss';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const registerUser = async(e) => {
    e.preventDefault();

    setError('');

    try {
      await signIn(email, password);
    } catch(e) {
      setError(e.message);
    }    
  }

  return(
    <div className="login">
      <form onSubmit={registerUser} className="login__form">
          <h2 className="login__form-title">Login</h2>
        <div className="login__email">
          <label className="login__form-label" htmlFor="email">Email</label>
          <input 
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder={'Enter your email'}
            name="email"
            className="login__form-input"
            id="email"
          />
        </div>
        <div className="login__password">
        <label className="login__form-label" htmlFor="password">Password</label>
          <input 
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder={'Enter your password'}
            name="password"
            className="login__form-input"
            id="password"
          />
        </div>
        {error && <p className="login__error">{error}</p>}
        <div className="login__button-wrapper">
          <button className="login__btn">Sign In</button>
        </div>
        <p className="login__sign-up">Don't have an account? <Link to={SIGN_UP_ROUTE} className="login__sign-up-link">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
