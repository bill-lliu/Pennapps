import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { Stitch } from 'mongodb-stitch-browser-sdk';
import { Line } from 'react-chartjs-2';

import '../css/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Stitch.defaultAppClient.auth.currentUser,
    };
  }

  componentWillMount() {
    if (!this.state.user) {
      this.props.history.push('/');
    }
  }

  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sugar',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Salt',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(202, 219, 52,0.4)',
          borderColor: 'rgba(202, 219, 52,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(202, 219, 52,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(229, 255, 0,1)',
          pointHoverBorderColor: 'rgba(202, 219, 52,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [10, 87, 43, 32, 34, 42, 14],
        },
        {
          label: 'Fat',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(224, 42, 212,0.4)',
          borderColor: 'rgba(224, 42, 212,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(224, 42, 212,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(229, 255, 0,1)',
          pointHoverBorderColor: 'rgba(224, 42, 212,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [45, 34, 34, 53, 19, 23, 43],
        },
      ],
    };
    return (
      <div className="dashboard">
        <div className="new-request">
          <Paper className="new-request-container" zDepth={1}>
            <h1 style={{ textTransform: 'uppercase' }}>💩 you ate</h1>
            <Row>
              <Col md={6}>
                <h3 className="jesse" > This is the name of the food you just ate</h3>
                <ul>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                </ul>
              </Col>
              <Col md={6}>
                <h3 className="jesse" > This is the name of the food you just ate</h3>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <h3 className="jesse" > This is the name of the food you just ate</h3>
                <ul>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                </ul>
              </Col>
              <Col md={6}>
                <h3 className="jesse" > This is the name of the food you just ate</h3>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
              </Col>
            </Row>
            <hr />
            <h1 style={{ textTransform: 'uppercase' }}>💩 you didn't eat</h1>
            <Row>
              <Col md={6}>
                <h3 className="jesse" > This is the name of the food you just ate</h3>
                <ul>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                </ul>
              </Col>
              <Col md={6}>
                <h3 className="jesse" > This is the name of the food you just ate</h3>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <h3 className="jesse" > This is the name of the food you just ate</h3>
                <ul>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                  <li><b> onthunetohu</b>: netouhoentuheong</li>
                </ul>
              </Col>
              <Col md={6}>
                <h3 className="jesse" > This is the name of the food you just ate</h3>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
                <li><b> onthunetohu</b>: netouhoentuheong</li>
              </Col>
            </Row>
            <hr />

            <h1 style={{ textTransform: 'uppercase' }}>💩 you ate in graph format</h1>
            <Line data={data} />

          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
