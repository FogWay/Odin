import React from 'react';
import { Route, Router, Switch } from 'dva/router';

import Login from './routes/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history} >
      <Switch >
        <Route path="/login" exact component={Login} />
      </Switch >
    </Router >
  );
}

export default RouterConfig;
