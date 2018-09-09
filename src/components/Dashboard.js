import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import { Line } from 'react-chartjs-2';
import { NutritionLabel } from 'react-fda-nutrition-facts';
import '../css/Dashboard.css';


const db = Stitch.defaultAppClient.getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas',
).db('sugar-cubed');

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Stitch.defaultAppClient.auth.currentUser,
      data: [],
    };
  }

  componentWillMount() {
    if (!this.state.user) {
      this.props.history.push('/');
    } else {
      const scans = db.collection('scans');
      scans.aggregate([]).asArray().then((data) => {
        this.setState({ data });
      });
    }
  }
  static getPercent(data, id, rec) {
    const nutrient = data.full_nutrients.find(e => e.attr_id == id);
    if (nutrient === undefined) {
      return 0;
    }
    return (nutrient.value / 40 / rec * 100).toFixed(2);
  }

  render() {
    const graphData = {
      Sun: {}, Mon: {}, Tues: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {},
    };

    this.state.data.forEach((scan) => {
      const day = new Date(scan.ts.high_ * 1000).toUTCString().split(',')[0];
      // console.log(day);
      if (graphData[day].sugar) {
        graphData[day].sugar += scan['nutrients-data'].nf_sugars;
      } else {
        graphData[day].sugar = scan['nutrients-data'].nf_sugars;
      }
      if (graphData[day].salt) {
        graphData[day].salt += scan['nutrients-data'].nf_sodium / 1000 * 2.5;
      } else {
        graphData[day].salt = scan['nutrients-data'].nf_sodium / 1000 * 2.5;
      }
    });
    const data = {
      labels: ['Sept 05', 'Sept 06', 'Sept 07', 'Sept 08', 'Today'],
      datasets: [
        {
          label: 'Sugar',
          yAxisID: 'SUGAR',
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
          data: [graphData.Wed.sugar, graphData.Thu.sugar, graphData.Fri.sugar, graphData.Sat.sugar, graphData.Sun.sugar],
        },
        {
          label: 'Salt',
          yAxisID: 'SALT',
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
          data: [graphData.Wed.salt, graphData.Thu.salt, graphData.Fri.salt, graphData.Sat.salt, graphData.Sun.salt],
        },
      ],
    };

    const options = {
      tooltips: {
        callbacks: {
          label(tooltipItems, data) {
            return `${data.datasets[tooltipItems.datasetIndex].label}: ${tooltipItems.yLabel} grams`;
          },
        },

      },
      scales: {
        yAxes: [{
          id: 'SUGAR',
          type: 'linear',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Grams of Sugar',
          },
        }, {
          id: 'SALT',
          type: 'linear',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'Grams of Salt',
          },
        }],
      },
    };

    return (
      <div className="dashboard">
        <div className="new-request">
          <Paper className="new-request-container" zDepth={1}>
            <h1 style={{ textTransform: 'uppercase' }}>💩 you ate</h1>
            <Row>
              {
              this.state.data.filter(scan => scan.eaten).map(scan => (
                <Col md={6}>
                  <h3 className="jesse" >{scan['display-name']}</h3>
                  <span>{new Date(scan.ts.high_ * 1000).toUTCString()}</span>
                  <div style={{ marginLeft: 50, marginRight: 50 }}>
                    <NutritionLabel
                      servingSize={`${scan['nutrients-data'].serving_weight_grams} grams`}
                      calories={scan['nutrients-data'].nf_calories}
                      totalFat={scan['nutrients-data'].nf_total_fat}
                      saturatedFat={scan['nutrients-data'].nf_saturated_fat}
                      transFat={scan['nutrients-data'].nf_total_fat - scan['nutrients-data'].nf_saturated_fat}
                      cholesterol={scan['nutrients-data'].nf_cholesterol}
                      sodium={scan['nutrients-data'].nf_sodium}
                      totalCarbs={scan['nutrients-data'].nf_total_carbohydrates}
                      dietaryFiber={scan['nutrients-data'].nf_dietary_fibers}
                      sugars={scan['nutrients-data'].nf_sugars}
                      protein={scan['nutrients-data'].nf_protein}
                      vitaminA={Dashboard.getPercent(scan['nutrients-data'], 318, 700)}
                      calcium={Dashboard.getPercent(scan['nutrients-data'], 301, 1000)}
                      vitaminC={Dashboard.getPercent(scan['nutrients-data'], 401, 90)}
                      iron={Dashboard.getPercent(scan['nutrients-data'], 303, 16)}
                    />
                  </div>
                </Col>
              ))
            }
            </Row>
            <h1 style={{ textTransform: 'uppercase' }}>💩 you didn't eat</h1>
            <Row>
              {
                this.state.data.filter(scan => !scan.eaten).map(scan => (
                  <Col md={6}>
                    <h3 className="jesse" >{scan['display-name']}</h3>
                    <span>{new Date(scan.ts.high_ * 1000).toUTCString()}</span>
                    <div style={{ marginLeft: 50, marginRight: 50 }}>
                      <NutritionLabel
                        servingSize={`${scan['nutrients-data'].serving_weight_grams} grams`}
                        calories={scan['nutrients-data'].nf_calories}
                        totalFat={scan['nutrients-data'].nf_total_fat}
                        saturatedFat={scan['nutrients-data'].nf_saturated_fat}
                        transFat={scan['nutrients-data'].nf_total_fat - scan['nutrients-data'].nf_saturated_fat}
                        cholesterol={scan['nutrients-data'].nf_cholesterol}
                        sodium={scan['nutrients-data'].nf_sodium}
                        totalCarbs={scan['nutrients-data'].nf_total_carbohydrates}
                        dietaryFiber={scan['nutrients-data'].nf_dietary_fibers}
                        sugars={scan['nutrients-data'].nf_sugars}
                        protein={scan['nutrients-data'].nf_protein}
                        vitaminA={Dashboard.getPercent(scan['nutrients-data'], 318, 700)}
                        calcium={Dashboard.getPercent(scan['nutrients-data'], 301, 1000)}
                        vitaminC={Dashboard.getPercent(scan['nutrients-data'], 401, 90)}
                        iron={Dashboard.getPercent(scan['nutrients-data'], 303, 16)}
                      />
                    </div>
                  </Col>
                ))
              }
            </Row>
            <h1 style={{ textTransform: 'uppercase' }}>💩 you ate in graph format</h1>
            <Line data={data} options={options} />

          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
