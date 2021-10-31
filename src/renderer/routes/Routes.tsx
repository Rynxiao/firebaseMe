import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Layout from 'renderer/layout/Layout';
import Login from 'renderer/layout/Login';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Layout} />
    </Switch>
  </Router>
);

export default Routes;
