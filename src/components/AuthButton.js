import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import SignIn from 'react-icons/lib/fa/sign-in';
import SignOut from 'react-icons/lib/fa/sign-out';

import {
  Stitch,
  UserPasswordCredential,
} from 'mongodb-stitch-browser-sdk';


import '../css/AuthButton.css';

class AuthButton extends Component {
  static logout() {
    Stitch.defaultAppClient.auth.logout().then(() => {
      console.log('logged out');
      window.location.reload();
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      signedIn: props.signedIn,
      email: '',
      password: '',
      toastOpen: false,
      toastMessage: '',
    };
  }
  login(email, password) {
    const credential = new UserPasswordCredential(email, password);
    Stitch.defaultAppClient.auth
      .loginWithCredential(credential).then((authedId) => {
        console.log(`successfully logged in with id: ${authedId.id}`);
        window.location.reload();
        this.props.history.push('/dashboard');
      }).catch((err) => {
        console.error(err);
        this.setState({ toastMessage: err.message });
        this.setState({ toastOpen: true });
      });
  }

  render() {
    return (
      <div className="auth-button-container" style={{ display: 'inline' }}>
        <div style={{ display: 'inline' }}>
          {this.state.signedIn ? '' : <div style={{ display: 'inline' }}><TextField
            hintText="Input Email"
            value={this.state.email}
            className="yikes"
            style={{ margin: 10 }}
            onChange={(e, val) => { this.setState({ email: val }); }}
          />
            <TextField
              hintText="Input Password"
              value={this.state.password}
              className="yikes"
              style={{ margin: 10 }}
              type="password"
              onChange={(e, val) => { this.setState({ password: val }); }}
            />
          </div>}
        </div>
        <FlatButton
          style={{ display: 'inline' }}
          className="auth-button"
          type="submit"
          icon={this.state.signedIn ? <SignOut /> : <SignIn />}
          onClick={() => this.state.signedIn ? AuthButton.logout() : this.login(this.state.email, this.state.password)}
          label={this.state.signedIn ? 'Logout' : 'Login'}
          hoverColor="transparent"
        />
        <Snackbar
          open={this.state.toastOpen}
          message={this.state.toastMessage}
          autoHideDuration={1000}
          onRequestClose={() => this.setState({ toastOpen: false })}
        />

      </div>
    );
  }
}

AuthButton.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};

export default withRouter(AuthButton);
