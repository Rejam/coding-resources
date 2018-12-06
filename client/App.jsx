import React from 'react';
import Sidebar from 'react-sidebar';
import { NavBar, Main, CategoryList } from './components/Common';
import api from './services/api';
import auth from './services/auth';
import history from './services/history';
import './App.scss';

class App extends React.Component {
  state = {
    categories: [],
    isAuthenticated: false,
  };

  async componentDidMount() {
    const { categories } = await api.getCategories();
    this.setState({ categories });
    const isAuthenticated = await auth.isAuthenticated();
    this.setState({ isAuthenticated });
  }

  gotTo = (route) => {
    history.replace(`/${route}`);
  }

  login = () => {
    auth.login();
    this.setState({ isAuthenticated: true });
  }

  logout = () => {
    auth.logout();
    this.setState({ isAuthenticated: false });
  }

  render() {
    const { categories, isAuthenticated } = this.state;

    return (
      <>
        <NavBar
          isAuthenticated={isAuthenticated}
          logout={this.logout}
          login={this.login}
        />
        <Sidebar
          open
          docked
          rootClassName="sidebarRoot"
          sidebar={<CategoryList categories={categories} />}
        >
          <Main
            categories={categories}
          />
        </Sidebar>
      </>
    );
  }
}

export default App;
