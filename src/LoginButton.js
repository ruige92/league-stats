import React from 'react';

class LoginButton extends React.Component{
  render(){
    return(
      <ul id="loginBtns">
        <li id="loginBtn" onClick={this.props.login}>Login</li>
        <li id="regiBtn" onClick={this.props.regi}>Register</li>
      </ul>
    )
  }
}

export default LoginButton;
