import React from 'react';
import classes from './signin.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { request } from '../../util/fetchApi';
import { login } from '../../redux/authSlice'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await request(
        '/auth/login',
        'POST',
        { 'Content-Type': 'application/json' },
        { email, password }
      );
      dispatch(login(data));
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'> Sign in</button>
          <p>
            Don't have an account yet? <Link to='/signup'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
