import React, { useState } from 'react';
import { signUp, signWithGoogle } from '../../helpers/auth';
import { auth } from '../../services/firebase';

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

  const signUpWithGoogleHandler = async() => {
    try {
      await signWithGoogle(email, password);
    } catch(e) {
      setError(e.message);
    } 
  }

  return(
    <div className="sign-up">
    <form onSubmit={signUpHandler}>
      <div className="sign-up__email">
        <input 
          type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder={'Enter your email'}
          name="email"
        />
      </div>
      <div className="sign-up__password">
        <input 
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder={'Enter your password'}
          name="password"
        />
      </div>
      {error && <p className="sign-up__error">{error}</p>}
      <button onClick={signUpHandler}>Sign Up</button>
    </form>
    <div>
      <button onClick={signUpWithGoogleHandler}>SignUp with Google</button>
    </div>
  </div>
  );
}

export default SignUp;
