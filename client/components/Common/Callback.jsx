import React from 'react';
import auth from '../../services/auth';
import history from '../../services/history';

class Callback extends React.Component {
  async componentDidMount() {
    await auth.handleAuth();
    history.replace('/');
  }

  render() {
    return (
      <div>Logging in...</div>
    );
  }
}

export default Callback;
