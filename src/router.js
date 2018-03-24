import React from 'react';
import { Route, Router, Switch } from 'dva/router';

import Login from './routes/routeLogin/Login';
import Home from './routes/routeHome/Home';

function RouterConfig({ history }) {
  return (
    <Router history={ history }>
      <Switch>
        <Route path="/login" exact component={ Login }/>
        <Route path="/home" exact component={ Home }/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
