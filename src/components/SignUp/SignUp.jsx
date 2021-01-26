import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp, signWithGoogle } from '../../helpers/auth';
import { LOGIN_ROUTE } from '../../routes';
import './SignUp.scss';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signUpHandler = async(e) => {
    e.preventDefault();

    setError('');

    try {
      await signUp(email, password);
    } catch(e) {
      setError(e.message);
    } 
  }

  return(
    <div className="sign-up">
      <form 
        onSubmit={signUpHandler}
        className="sign-up__form"
      >
        <h2 className="sign-up__form-title">Sign Up</h2>
        <div className="sign-up__email">
        <label className="sign-up__form-label" htmlFor="email">Email</label>
          <input 
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder={'Enter your email'}
            name="email"
            className="sign-up__form-input"
            id="email"
          />
        </div>
        <div className="sign-up__password">
          <label className="sign-up__form-label" htmlFor="password">Password</label>
          <input 
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder={'Enter your password'}
            name="password"
            className="sign-up__form-input"
            id="password"
          />
        </div>
        {error && <p className="sign-up__error">{error}</p>}
        <div className="sign-up__btn-wrapper">
          <button 
            onClick={signUpHandler}
            className="sign-up__btn"
          >
            Sign Up
          </button>
        </div>
        <p className="sign-up__login">Already registered? <Link to={LOGIN_ROUTE} className="sign-up__login-link">Login</Link></p>
      </form>
    </div>
  );
}

export default SignUp;
