import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { request } from '../../util/fetchApi';
import { login } from '../../redux/authSlice';
import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Paper,
  Title,
  Anchor,
} from '@mantine/core';
import classes from './signin.module.css';

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
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <Container size={420} my={40} className={classes.wrapper}>
        <Title order={1} textWrap='wrap' ta='center' mb={20}>
          Sign in
        </Title>
        <Paper
          shadow='xl'
          withBorder
          p={30}
          mt={30}
          w={280}
          h={400}
          radius='md'
          className={classes.wrapper}
        >
          <form onSubmit={handleLogin}>
            <TextInput
              label='Email'
              placeholder='Email'
              w={220}
              mb={20}
              radius='sm'
              size='md'
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className={classes.input}
            />
            <PasswordInput
              label='Password'
              placeholder='Password'
              w={220}
              mb={20}
              radius='sm'
              size='md'
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className={classes.input}
            />
            <Button
              fullWidth
              mt='xl'
              type='submit'
              size='md'
              radius={5}
              ta='center'
              // ml={60}
              variant='filled'
              className={classes.button}
            >
              Sign in
            </Button>
          </form>
          <Text align='center' mt='xl'>
            Don't have an account yet? <br />
            <Anchor component={Link} to='/signup'>
              Sign up
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </div>
  );
};

export default SignIn;
