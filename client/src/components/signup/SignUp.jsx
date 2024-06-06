import React from 'react';
import classes from './signup.module.css';
import { AiOutlineFileImage } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { request } from '../../util/fetchApi';
import { useDispatch } from 'react-redux'
import { register } from '../../redux/authSlice'

const SignUp = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleState = (event) => {
    setState((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let fileName = null;
      if (photo) {
        const formData = new FormData();
        fileName = crypto.randomUUID() + photo.name;
        formData.append('filename', fileName);
        formData.append('image', photo);

        await request('/upload/image', 'POST', {}, formData, true);
      } else {
        return;
      }
      const data = await request(
        '/auth/register',
        'POST',
        {
          'Content-Type': 'application/json',
        },
        {...state, profileImg: fileName}
      );
      dispatch(register(data))
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={handleState}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={handleState}
          />
          <label htmlFor='photo'>
            {' '}
            Upload photo <AiOutlineFileImage />
          </label>
          <input
            id='photo'
            type='file'
            style={{ display: 'none' }}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleState}
          />
          <button type='submit'>Register</button>
          <p>
            Already have an account ? <Link to='/signin'>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
