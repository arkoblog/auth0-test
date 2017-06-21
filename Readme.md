# 1. Setting up the server side of things
We begin by first initializing the server side. For this, we are going to be using the ExpressJS framework.

### 1.1. Initialize an empty node project

`npm init -y`

### 1.2. Initailize empty git repo

git init

### 1.3. Create index.js @ `/server/index.html`:

```javascript
import express from 'express';
import path from 'path'

let portNumber = 4000;
let app = express();


app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(portNumber, () => {
	console.log(`App is running on port ${portNumber}`)
})

```
### 1.4. Create index.html page @ `/server/index.html`

```html
<!DOCTYPE html>
<html>

<head>
    <title>Auth0 Testing</title>
</head>

<body>
    <h1>Hello world!</h1>
</body>

</html>

```

### 1.5. Install express and babel-cli

`npm i --save-dev babel-cli`
`npm i -S express`


### 1.6. Install nodemon

`npm i --save-dev nodemon`

### 1.7. Update `/package.json` with the server script

```javascript
"scripts": {
	"server": "nodemon --watch server --exec babel-node -- server/index",
	"test": "echo \"Error: no test specified\" && exit 1"
},
```

###  1.8. Create `/.babelrc` file 

```javascript
{
	"presets": ["es2015"]
}

```
### 1.9. Install required es2015 preset dependency

`npm i --save-dev babel-preset-es2015`

### 1.10. Run server
`npm run server`

# 2. Setting up a react component:
Our next goal is to create a react app, and host it through the index.js file.

### 2.1. Update the body section of `/server/index.html`

```html
<body>
    <div id="app"></div>
    <script src="bundle.js"/>
</body>
```

### 2.2. Create entry point for react app @ `/client/index.js`

```javascript
import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

render(<App/>, document.getElementById('app'))

```

### 2.3. Create App component @ `/client/components/App.js`
```javascript
import React from 'react';

class App extends React.Component {
	render() {
		return (
				<h1>Hello from react!</h1>
			)
	}
};

export default App;
```

### 2.4. Install react and react-dom
`npm i -S react react-dom`

### 2.5. Update `/server/index.js` to import and use webpack with webpack config file (Change 1 and Change 2):

```javascript
// server/index.js

import express from 'express';
import path from 'path'

// Change - 1 (Import webpack)
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.dev'
//End of change1

let portNumber = 4000;
let app = express();

// Change 2 - Use middleware
app.use(webpackMiddleware(webpack(config)))
//

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(portNumber, () => {
	console.log(`App is running on port ${portNumber}`)
})
```

### 2.6. Create webpack config file at `/webpack.config.dev.js`

```javascript
import path from 'path';

export default {
    devtool: 'source-map',
    entry: [
        './client/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            // js
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: [path.join(__dirname, 'client'),
                path.join(__dirname, 'server/shared')]
            },
            // CSS
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            }
        ]
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
};
```


### 2.7. Install webpack and webpack-dev-middleware
`npm i --save-dev webpack webpack-dev-middleware`

### 2.8. Install babel-loader and babel react preset
`npm i --save-dev babel-loader babel-preset-react`

### 2.9. Update `/.babelrc/` file to include react preset:
```javascript
{
	"presets": ["es2015", "react"]
}
```

### 2.10. Run server
`npm run server`

# 3. Setting up basic routing and bootstrap
Next step would then be to set up basic routing using react-router-dom and also setup bootstrap. 

### 3.1. Include bootstrap css in `/server/index.html`

```html
<head>
...
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
...
</head>

```

### 3.2. Import react-router-dom @ `/client/index.js` , create routes variable and render that instead. 

```javascript
import React from 'react';
import { render } from 'react-dom';

// Change 1 - Import react-router-dome components 
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

import App from './components/App';


// Change 2 - Create routes variable
const routes = (
	<Router>
		<App/>
	</Router>
)

// Change 3 - Render routes variable instead
render(routes, document.getElementById('app'))
```

### 3.3. Install react-router-dom;
`npm i -S react-router-dom`

### 3.4. Run server
`npm run server`


# 4. Refactor client code, create Homepage component
Simple refactoring and styling 

### 4.1. Update App component @ `/client/components/App.js`
```javascript
import React from 'react';
import HomePage from './HomePage';

class App extends React.Component {
	render() {
		return (
				<div>
					<HomePage/>
				</div>
			)
	}
};

export default App;
```

### 4.2. Create HomePage component @  `/client/components/HomePage.js`
```javascript
import React from 'react';
import css from '../static/css/homepage.css'

class HomePage extends React.Component {
	render() {
		return (
				<div className="container-fluid banner">
						<h1> Welcome to the Auth0 test application </h1>
						<h5>This app was design to test the authentication service provided by Auth0. The app was built using React and Redux.</h5>
				</div>
			)
	}
};

export default HomePage;
```

### 4.3. Refactor `client/index.js` code a little
```javascript
import React from 'react';
import { render } from 'react-dom';
import routes from './config/routes'

render(routes, document.getElementById('app'))
```

### 4.4. Create `/config/routes.js'
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

import App from '../components/App';
import HomePage from '../components/HomePage';


export default (
	<Router>
		<App>
			<Route exact path = "/" component={HomePage}/>
		</App>
	</Router>
)
```
### 4.5. Install style-loader to load css files
`npm i -S style-loader css-loader`

### 4.6. Create homepage.css @ `/client/static/css/homepage.css`
```css
.banner {
    color:#fff;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    width: 100vw;
    height: 100vh;
    background-color: #4285f4;
}
```

### 4.7. Run server
`npm run server`


# 5. Redux integration

### 5.1. Load redux, react-redux and redux-thunk dependencies 

`npm i -S redux redux-thunk react-redux`


### 5.2. Update `/client/routes.js` to use these dependencies:
```javascript
// some other code
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
// some other code
```

### 5.3. Create store @ `/client/store.js` 
```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
    (state = {}) => state,  
	compose (
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f 
		)
);

export default store;
```


### 5.4. Use provider to pass that store into the react app @ `/client/config/routes.js`  
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store'

import App from '../components/App';
import HomePage from '../components/HomePage';

export default (
	<Provider store = {store}> 
	<Router>
		<App>
			<Route exact path = "/" component={HomePage}/>
		</App>
	</Router>
	</Provider>
)
```

### 5.5. Create rootReducer.js @ `/client/reducers/rootReducer.js`
```javascript
import { combineReducers } from 'redux';
import auth from './auth'

export default combineReducers ({
	auth
})
```

### 5.6. Create auth reducer @ `/client/reducers/auth.js`
```javascript
import {SET_CURRENT_USER} from '../actions/types'
import isEmpty from 'lodash/isEmpty'

const initialState = {
	isAuthenticated: false,
	user: {}

}

export default (state = initialState, action = {}) => {
    // console.log(action.type)
    switch (action.type) {
        case SET_CURRENT_USER: 
        	// console.log("MyAction",action)
        	return {
        		isAuthenticated: !isEmpty(action.user),
        		user: action.user
        	}
        default: return state;
    }
}
```

### 5.7. Create action definitions @`/client/actions/types.js`
```javascript
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
```

### 5.7. Install lodash as dependency
`npm i -S lodash`

# 6. Incorporate Facebook Login

### 6.1 Install facebook login button and google login component
`npm install --save react-facebook-login react-google-login`



### 6.2 Create FacebookLogin component @ `/client/components/FacebookLogin.js`
```javascript
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
```
### 6.3. Create Google login Component  @ `/client/components/FacebookLogin.js`
```javascript
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
```

### 6.3 Update `/clients/components/HomePage.js` to include FacebookLogin component and GoogleLogin component
```javascript
import React from 'react';
import css from '../static/css/homepage.css'
import FacebookLogin from './logins/FaceBookLogin'
import GoogleLogin from './logins/GoogleLogin'

class HomePage extends React.Component {
	render() {
		return (
			<div className="container-fluid banner">
				<h1> Welcome to the Auth0 test application </h1>
				<h5>This app was design to test the authentication service provided by Auth0. The app was built using React and Redux.</h5>
				<FacebookLogin/>
				<GoogleLogin/>
			</div>
		)
	}
};

export default HomePage;
```

