import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import {
  Stitch,
  RemoteMongoClient,
  GoogleRedirectCredential,
  FacebookRedirectCredential,
} from 'mongodb-stitch-browser-sdk';

import AuthButton from './components/AuthButton';

import './css/Header.css';

const appId = 'ios-qjlqp';
const client = Stitch.initializeDefaultAppClient(appId);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: client.auth.isLoggedIn,
      drawerOpen: false,
    };
  }

  render() {
    return (
      <div className="navigation">
        <Link to="/main">
          <AppBar
            title="Sugar³"
            style={{ backgroundColor: '#880E4F' }}
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
        </Drawer>
      </div>
    );
  }
}

export default Header;
