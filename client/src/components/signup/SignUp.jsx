import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  FileInput,
  Container,
  Paper,
  Title,
  Text,
  Alert,
  Anchor,
} from '@mantine/core';
import { AiOutlineFileImage } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../util/fetchApi';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';
import classes from './signup.module.css';

const SignUp = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleState = (event) => {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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
        { ...state, profileImg: fileName }
      );
      dispatch(register(data));
      navigate('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      {error && (
        <Alert
          title='Incorrect credential'
          color='red'
          className={classes.alert}
          withCloseButton
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}
      <Container size={420} my={40} className={classes.wrapper}>
        <Title align='center' className={classes.title}>
          Sign up
        </Title>
        <Paper withBorder shadow='md' p={35} mt={20} radius='md'>
          <form onSubmit={handleSubmit}>
            <TextInput
              label='Username'
              placeholder='Username'
              name='username'
              mb={5}
              onChange={handleState}
              required
              className={classes.input}
            />
            <TextInput
              label='Email'
              placeholder='Email'
              name='email'
              mb={5}
              onChange={handleState}
              required
              className={classes.input}
            />
            <FileInput
              label='Upload photo'
              placeholder='Choose file'
              mb={5}
              icon={<AiOutlineFileImage />}
              onChange={setPhoto}
              className={classes.fileInput}
            />
            <PasswordInput
              label='Password'
              placeholder='Password'
              name='password'
              mb={5}
              onChange={handleState}
              required
              className={classes.input}
            />
            <Button
              fullWidth
              mt='xl'
              radius={5}
              type='submit'
              className={classes.button}
            >
              Register
            </Button>
          </form>
          <Text align='center' mt='md'>
            Already have an account?
            <br />
            <Anchor component={Link} to='/signin'>
              Sign in
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
