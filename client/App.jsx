import React from 'react';
import Sidebar from 'react-sidebar';
import { Main, CategoryList } from './components/Common';
import { AppBarC } from './components/Containers';
import api from './services/api';
import auth from './services/auth';
import history from './services/history';
import './App.scss';

class App extends React.Component {
  state = { categories: [] };

  async componentDidMount() {
    const { categories } = await api.getCategories();
    this.setState({ categories });
  }

  gotTo = (route) => {
    history.replace(`/${route}`);
  }

  render() {
    const { categories } = this.state;

    return (
      <>
        <AppBarC />
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
