import React from 'react';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/LockOutlined';
import { Checkbox, Avatar, TextField, Button, Typography, FormControlLabel, Divider } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';

import './Login.scss';
import api from '../../api';

const Login = ({ setLogin, history }) => {
  const login = async (e) => {
    e.preventDefault();
    const form = e.target;
    const {
      username: { value: username },
      password: { value: password },
    } = form.elements;
    const credentials = { username, password };
    const success = await api.login(credentials);
    if (success) {
      setLogin();
      history.push('/');
    }
  };

  const responseGoogle = (response) => {
    const { email } = response.profileObj;
    const username = email.split('@')[0];

    console.log(response, username);
  };

  return (
  <>
    <Avatar>
      <LockIcon />
    </Avatar>
    <form onSubmit={login}>
      <div>
        <TextField
          id="username"
          label="username"
          className="form-row"
          type="text"
          name="username"
          autoComplete="username"
          margin="normal"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password"
          className="form-row"
          type="password"
          autoComplete="password"
          margin="normal"
          variant="outlined"
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </div>
    </form>
    <form>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
    </form>
    <div>
      <GoogleLogin
        clientId="1095933944063-tgul5e019aku70bhgpc0pf19jskm2jtp.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
    <Divider className="form-spacer" />
    <Typography variant="h6" className="form-spacer">
      Don&apos;t have an account?
    </Typography>
    <Button variant="contained" color="secondary">
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/register">
        Register
      </Link>
    </Button>
  </>
  );
};

export default Login;
