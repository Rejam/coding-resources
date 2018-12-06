import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import NavButton from './NavButton';

import './NavBar.scss';

const MenuAppBar = ({ isAuthenticated, login, logout }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit" className="grow">
        <NavButton link="/">Programming Reference Site</NavButton>
      </Typography>
      { isAuthenticated
        ? (
          <>
            <NavButton link="/submit-resource">
              Submit Resource
            </NavButton>
            <Button onClick={logout}>
              Log Out
            </Button>
          </>
        )
        : <Button onClick={login}>Log In</Button>
      }
    </Toolbar>
  </AppBar>
);

MenuAppBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  logout: PropTypes.func,
};

export default MenuAppBar;
