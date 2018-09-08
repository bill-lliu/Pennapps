import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as firebase from 'firebase';

import Header from './Header';
import Main from './Main';

class App extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp({
      apiKey: 'AIzaSyDog6nHNrHOnWSIznLzNvXB4GV9ackOdrc',
      authDomain: 'banana-1cfd5.firebaseapp.com',
      databaseURL: 'https://banana-1cfd5.firebaseio.com',
      projectId: 'banana-1cfd5',
      storageBucket: 'banana-1cfd5.appspot.com',
      messagingSenderId: '801943785869'
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Main />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
