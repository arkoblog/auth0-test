import React from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    responseFacebook(response) {
        console.log("My Login", response);
        //anything else you want to do(save to localStorage)... 
    }

    render() {
        return (
            <div>
              <FacebookLogin
                appId="1921128611475300"
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook} 
              />
            </div>
        );
    }

}

export default Login;
