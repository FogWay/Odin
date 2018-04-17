import React from 'react';
import { Route, Router, Switch } from 'dva/router';

import Login from './routes/routeLogin/Login';
import index from './routes/routeIndexPage/IndexPage';
import CategoryManage from './routes/routeCategory/Category';

function RouterConfig({ history }) {
  return (
    <Router history={ history }>
      <Switch>
        <Route path="/login" component={ Login }/>
        <Route path="/index" component={ index }/>
        <Route path="/index/category" component={ CategoryManage }/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
