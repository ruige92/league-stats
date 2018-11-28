import React from 'react';
import './LoginForm.css';
import LoginButton from './LoginButton';
import ForgetPw from './ForgetPw';

const logins = {
  "raylism":{
    "password":"000000",
    "email":"ray@gmail.com",
    "security":"123456"
  }
}

class LoginForm extends React.Component{
  constructor(props){
    super(props)
    this.state=({
      logged:false,
      button:true,
      loginForm:false,
      regiForm:false,
      registered:false,
      notification:'',
      nameNoti:'',
      passNoti:'',
      emailNoti:'',
      memoryNoti:'',
      nameValid:false,
      passValid:false,
      emailValid:false,
      memoryValid:false,
      forgetForm:false
    })
  }

  validate=()=>{
    const user = document.querySelector('input[type="username"]').value;
    const pw = document.querySelector('input[type="password"]').value;
    if( (logins.hasOwnProperty(user)) && (logins[user]['password']===pw) ){
      this.setState({
        logged:true,
        notification:'',
        loginForm:false,
      })
      const loginBtn = document.querySelector('#loginBtn');
      loginBtn.innerHTML='Welcome, '+user;
      console.log('welcome')
      const regiBtn = document.querySelector('#regiBtn');
      regiBtn.innerHTML='Log Out';
    }else if (!(logins.hasOwnProperty(user))){
      this.setState({
        notification:'Username Not Found'
      })
    }else if (logins.hasOwnProperty(user) && logins[user]['password']!==pw) {
      this.setState({
        notification:'Wrong Password'
      })
    }
  }

  register=()=>{
    const user = document.querySelector('input[type="username"]').value;
    const pw = document.querySelector('input[type="password"]').value;
    const mail = document.querySelector('input[type="email"]').value;
    const memory = document.querySelector('input[type="word"]').value;
    if ((user === '') || (user === null)){
      this.setState({
        notification:'Username is required!'
      })
    }else if ((pw === '') || (pw === null)){
      this.setState({
        notification:'Password is required!'
      })
    }else if ((mail === '') || (mail === null)){
      this.setState({
        notification:'Email is required!'
      })
    }else if ((memory === '') || (memory === null)){
      this.setState({
        notification:'Security word is required!'
      })
    }else if((this.state.nameValid)&&(this.state.passValid)&&(this.state.emailValid)&&(this.state.memoryValid)){

      if(logins.hasOwnProperty(user)) {
        this.setState({
          notification:'Username Already Exist'
        })
      }else{
        logins[user]={
          'password':pw,
          'email':mail,
          'security':memory
        }
        this.setState({
          notification:'Successfully Registered!',
          regiForm:false,
          loginForm:true
        })
        console.log(logins);
      }

    }else{
      this.setState({
        notification:'Please follow instructions to fill required fields.'
      })
    }
  }

  logOut=()=>{
    const loginBtn = document.querySelector('#loginBtn');
    const regiBtn = document.querySelector('#regiBtn');
    if(this.state.logged){
        loginBtn.innerHTML='Login';
        regiBtn.innerHTML='Register';
        this.setState({
          logged:false
        })
    }
  }

  loginToggle=()=>{
    if((this.state.logged === false) && (this.state.loginForm === false)){
      this.setState({
        loginForm:true,
        regiForm:false,
        forgetForm:false,
        notification:''
      })
    }else if((this.state.logged === false) && (this.state.loginForm)){
      this.setState({
        loginForm:false
      })
    }
  }

  regiToggle=()=>{
    if(this.state.logged){
      const loginBtn = document.querySelector('#loginBtn');
      const regiBtn = document.querySelector('#regiBtn');
      loginBtn.innerHTML='Login';
      regiBtn.innerHTML='Register';
      this.setState({
        logged:false
      })
    }else if((this.state.logged === false) && (this.state.regiForm === false)){
      this.setState({
        regiForm:true,
        loginForm:false,
        forgetForm:false,
        notification:''
      })
    }else if((this.state.logged === false) && (this.state.regiForm)){
      this.setState({
        regiForm:false
      })
    }else if(this.state.registered){
      this.setState({
        regiForm:false
      })
    }
  }

  forgetToggle=()=>{
    if(this.state.forgetForm){
      this.setState({
        notification:'',
        forgetForm:false
      })
    }else if(this.state.forgetForm === false){
      this.setState({
        forgetForm:true,
        loginForm:false,
        regiForm:false
      })
    }
  }

  memoryValidate=()=>{
    const memoryInput = document.querySelector('input[type="word"]');
    const memory = document.querySelector('input[type="word"]').value;

    if(memory.length <4){
      memoryInput.style.border="1px solid red";
      this.setState({
        memoryNoti:'Security answer need to be at least 4 characters!',
        memoryValid:false
      })
    }else{
      memoryInput.style.border="1px solid #ccc";
      this.setState({
        memoryNoti:'',
        memoryValid:true
      })
    }

  }

  nameValidate=()=>{
    const userInput = document.querySelector('input[type="username"]');
    const user = document.querySelector('input[type="username"]').value;
    if(user.length <6){
      userInput.style.border="1px solid red";
      this.setState({
        nameNoti:'Username need to have at least 6 characters!',
        nameValid:false
      })
    }else{
      userInput.style.border="1px solid #ccc";
      this.setState({
        nameNoti:'',
        nameValid:true
      })
    }
  }

  passValidate=()=>{
    const pwInput = document.querySelector('input[type="password"]');
    const pw = document.querySelector('input[type="password"]').value;
    if(pw.length <6){
      pwInput.style.border="1px solid red";
      this.setState({
        passNoti:'Password need to have at least 6 characters!',
        passValid:false
      })
    }else{
      pwInput.style.border="1px solid #ccc";
      this.setState({
        passNoti:'',
        passValid:true
      })
    }
  }

  emailValidate=()=>{
    const mailInput = document.querySelector('input[type="email"]');
    const mail = document.querySelector('input[type="email"]').value;
    if((mail.includes('@') === false) || (mail.includes('.') === false)){
      mailInput.style.border="1px solid red";
      this.setState({
        emailNoti:'Please enter a valid email address!',
        emailValid:false
      })
    }else{
      mailInput.style.border="1px solid #ccc";
      this.setState({
        emailNoti:'',
        emailValid:true
      })
    }
  }

  findPw=()=>{
    const user = document.querySelector('input[type="username"]').value;
    const memory = document.querySelector('input[type="word"]').value;
    const mail = document.querySelector('input[type="email"]').value;
    if ((user === '') || (user === null)){
      this.setState({
        notification:'Username is required!'
      })
    }else if ((mail === '') || (mail === null)){
      this.setState({
        notification:'Email is required!'
      })
    }else if ((memory === '') || (memory === null)){
      this.setState({
        notification:'Memoriable word is required!'
      })
    }else if((logins.hasOwnProperty(user)) && ((logins[user]['email']===mail)) && ((logins[user]['security']===memory))) {
      logins[user]['password'] = '000000';
      this.setState({
        notification:'Passwod reset successful! Temporary password: 000000',
        loginForm:true,
        regiForm:false,
        forgetForm:false
      })
    }else if((logins.hasOwnProperty(user)===false)){
      this.setState({
        notification: "Password reset failed"
      })
    }
  }

  render(){
    const loginForm = (
      <div id="login">
        <h1> Login </h1>
        <span>{this.state.notification}</span>
        <input placeholder="Username" type="username"/>
        <input placeholder="Password" type="password"/>
        <div id="login-btns">
          <button onClick={this.validate}>Login</button>
          <ForgetPw forgetToggle={this.forgetToggle}/>
        </div>
      </div>
    )

    const forgetForm = (
      <div id="forgetPass">
        <h1> Find Password </h1>
        <span>{this.state.notification}</span>
        <input placeholder="Username" type="username"/>
        <input placeholder="Email" type="email"/>
        <input placeholder="Memoriable Word" type="word"/>
        <div id="login-btns">
          <button onClick={this.findPw}>Find</button>
        </div>
      </div>
    )

    const regiForm = (
      <div id="register">
        <h1> Register </h1>
        <span>{this.state.notification}</span>
        <input onChange={this.nameValidate} placeholder="Username" type="username" required/>
        <span>{this.state.nameNoti}</span>
        <input onChange={this.passValidate} placeholder="Password" type="password" required/>
        <span>{this.state.passNoti}</span>
        <input onChange={this.emailValidate} placeholder="Email" type="email" required/>
        <span>{this.state.emailNoti}</span>
        <input onChange={this.memoryValidate} placeholder="Memoriable Word" type="word" required/>
        <span>{this.state.memoryNoti}</span>
        <div id="login-btns">
          <button onClick={this.register}>Register</button>
        </div>
      </div>
    )

    return(
      <div id="login-control">
        {this.state.button ? <LoginButton login={this.loginToggle} regi={this.regiToggle}/>:null}
        {this.state.loginForm ? loginForm : null}
        {this.state.regiForm ? regiForm : null}
        {this.state.forgetForm ? forgetForm : null}
      </div>
    )
  }
}

export default LoginForm;
