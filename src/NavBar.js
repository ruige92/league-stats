import React from 'react';
import './NavBar.css';
import LoginForm from './LoginForm';

const menuItems = ['Home', 'Connect'];
const navItems_left = menuItems.map((item,i)=><li key={'item_'+i}>{item}</li>);

class NavBar extends React.Component{
  render(){
    return(
      <div id="NavBar">
        <ul className="nav_left">{navItems_left}</ul>
        <div id="loginForm">
          <LoginForm />
        </div>
      </div>
    )
  }
}

export default NavBar;
