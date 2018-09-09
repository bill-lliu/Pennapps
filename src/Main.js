import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Dashboard from './components/Dashboard';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/main" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </main>
    );
  }
}

export default Main;
