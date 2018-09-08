import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import * as firebase from 'firebase';

import NewRequest from '../components/dashboard/NewRequest';

import '../css/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
    };
  }

  componentWillMount() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push('/');
      } else {
        this.setState({ user });
      }
    });
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  render() {
    return (
      <div className="dashboard">
        <div className="new-request">
          <Paper className="new-request-container" zDepth={1}>
            hi
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
