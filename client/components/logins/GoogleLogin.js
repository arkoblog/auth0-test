import React from 'react';
import  GoogleLogin  from 'react-google-login';

 
class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
    console.log("Ive logged in using google", googleUser)
  }
 
  render () {
    return (
      <div>

        <GoogleLogin
          clientId="1006818650712-6s129845iii803eeq5758g79eu53e9m0.apps.googleusercontent.com"
          buttonText="Login using google"
          onSuccess={this.responseGoogle.bind(this)}
          onFailure={this.responseGoogle.bind(this)}
        />
      </div>
    );
  }
 
}
 
export default Login;