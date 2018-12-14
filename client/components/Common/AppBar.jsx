import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NavButton from './NavButton';

import './AppBar.scss';

const MenuAppBar = ({ isAuthenticated, login, logout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className="grow">
          <NavButton link="/">Programming Resources</NavButton>
        </Typography>
        { isAuthenticated()
          ? (
            <>
              <NavButton link="/submit-resource">
                Submit Resource
              </NavButton>
              <NavButton onClick={logout}>Log Out</NavButton>
            </>
          )
          : <NavButton onClick={login}>Login In</NavButton>
        }
      </Toolbar>
    </AppBar>
  );
};

MenuAppBar.propTypes = {
  isAuthenticated: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
};

export default MenuAppBar;
