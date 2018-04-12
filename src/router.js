import React from 'react';
import { Route, Router, Switch } from 'dva/router';

import Login from './routes/routeLogin/Login';
import index from './routes/routeIndexPage/IndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={ history }>
      <Switch>
        <Route path="/login" exact component={ Login }/>
        <Route path="/index" exact component={ index }>
          {/*<Route path="/user_manage" component={UserManage}/>*/}
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
