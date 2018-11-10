import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="box header">
            <Header/>
          </div>
          <div className="box sidebar">
            <Sidebar/>
          </div>         
          <div className="box content">
            <Content/>
          </div>
          <div className="box footer">
            <Footer/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
