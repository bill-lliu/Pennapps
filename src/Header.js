import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import * as firebase from 'firebase';

import AuthButton from './components/AuthButton';

import './css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      drawerOpen: false,
    };
  }
  componentWillMount() {
    this.authListener = this.authListener.bind(this);
    this.authListener();
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ signedIn: true });
      } else {
        this.setState({ signedIn: false });
      }
    });
  }

  render() {
    return (
      <div className="navigation">
        <Link to="/main">
          <AppBar
            title="Sugar Cubed"
            style={{ backgroundColor: '#2196F3' }}
            iconElementLeft={
              <IconButton onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}>
                <MenuIcon />
              </IconButton>
          }
          >
            <AuthButton signedIn={this.state.signedIn} />
          </AppBar>
        </Link>
        <Drawer open={this.state.drawerOpen} docked={false}>
          <IconButton onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}>
            <CloseIcon />
          </IconButton>
          <Link to="/dashboard">
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <Link to="/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}

export default Header;
