import React, { Component } from 'react';
import './App.css';
// import NavBar from './NavBar';
import SearchBar from './SearchBar';
// import LoginForm from './LoginForm';

class App extends Component {

  render() {
    return (
      <div className="App">

        <div id="main">
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
