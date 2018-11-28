import React from 'react';

class ForgetPw extends React.Component{
  render(){
    return(
      <span id="forgetPw" onClick={this.props.forgetToggle}>Forget Password</span>
    )
  }

}

export default ForgetPw;
