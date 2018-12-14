import React from 'react';
import { AppBar } from '../Common';
import auth from '../../services/auth';
import history from '../../services/history';

const MenuAppBar = () => {
  const signOut = () => {
    auth.signOut();
    history.replace();
  }

  return (
    <AppBar
      login={auth.signIn}
      logout={signOut}
      isAuthenticated={auth.isAuthenticated}
    />
  );
};

export default MenuAppBar;

/*
import React from 'react';
import { AppBar } from '../Common';
import auth from '../../services/auth';

class MenuAppBar extends React.Component {
  state = { isAuthenticated: false };

  componentDidMount() {
    this.setState({ isAuthenticated: auth.isAuthenticated() });
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <AppBar
        login={auth.signIn}
        logout={auth.signOut}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

export default MenuAppBar;

*/