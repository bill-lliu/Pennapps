import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

import * as firebase from 'firebase';

import Plane from '../photos/bg.jpg';

import NewRequest from '../components/dashboard/NewRequest';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import '../css/Dashboard.css';

class Triage extends Component {
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
        <Card>
          <CardTitle title="Welcome" subtitle="We're excited to help you connect" />
          <CardText>
            Sugar Cubed helps connect immigrants to Canada with locals who speak the language.
            Get started by telling us if you are an immigrant or local!
          </CardText>
          <CardActions>
            <FlatButton label="Immigrant" onClick={() => this.props.history.push('/dashboard')} />
            <FlatButton label="Local" onClick={() => this.props.history.push('/dashboard')} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withRouter(Triage);
