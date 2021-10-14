import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Layout from 'renderer/components/layout/Layout';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={Layout} />≤
    </Switch>
  </Router>
);

export default Routes;
