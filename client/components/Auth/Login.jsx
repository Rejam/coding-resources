import React from 'react';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/LockOutlined';
import {
  Grid,
  Card,
  Avatar,
  TextField,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';
import api from '../../api';
import './Login.scss';

const Login = ({ login, history }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const {
      username: { value: username },
      password: { value: password },
    } = form.elements;
    const credentials = { username, password };
    const success = await api.login(credentials);
    if (success) {
      login();
      history.push('/');
    }
  };

  const config = {
    className: 'form-row',
    margin: 'normal',
    variant: 'outlined',
  };

  return (
    <Grid container className="main">
      <Grid item xs={6} sm={6}>
        <Card className="root">
          <div className="icon">
            <Avatar>
              <LockIcon />
            </Avatar>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="username"
                type="text"
                name="username"
                autoComplete="username"
                {...config}
              />
            </div>
            <div>
              <TextField
                label="Password"
                type="password"
                name="password"
                autoComplete="password"
                {...config}
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

          <Divider className="form-spacer" />

          <Typography variant="h6" className="form-spacer">
            Don&apos;t have an account?
          </Typography>
          <Button variant="contained" color="secondary">
            <Link style={{ color: 'white', textDecoration: 'none' }} to="/register">
              Register
            </Link>
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
