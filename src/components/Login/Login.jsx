import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../../helpers/auth';
import { SIGN_UP_ROUTE } from '../../routes';

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
      <form onSubmit={registerUser}>
        <div className="login__email">
          <input 
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder={'Enter your email'}
            name="email"
          />
        </div>
        <div className="login__password">
          <input 
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder={'Enter your password'}
            name="password"
          />
        </div>
        {error && <p className="login__error">{error}</p>}
        <button>Sign In</button>
        <p>Don't have an account? <Link to={SIGN_UP_ROUTE}>Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
