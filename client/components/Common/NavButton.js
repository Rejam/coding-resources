import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import './AppBar.scss';

const NavButton = ({ children, link, onClick }) => {
  return link
    ? (
      <NavLink style={{ color: 'white' }} to={link}>
        {children}
      </NavLink>
    ) : (
      <Button onClick={onClick} style={{ color: 'white' }}>
        {children}
      </Button>
    )
};

NavButton.propTypes = {
  children: PropTypes.any.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavButton;
