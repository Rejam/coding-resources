import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import NavButton from './NavButton';
import api from '../../services/api';

import './NavBar.scss';

const MenuAppBar = ({ isAuthenticated, login, logout }) => {
  return (
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
              <Button onClick={api.logout}>
                Log Out
              </Button>
            </>
          )
          : (
            <>
              <Button onClick={api.login}>Log In</Button>
            </>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

MenuAppBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  logout: PropTypes.func,
};

export default MenuAppBar;
