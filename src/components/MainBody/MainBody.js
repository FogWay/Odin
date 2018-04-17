import React from 'react';
import { connect } from 'dva';
import { Route, Router, Switch } from 'dva/router';

import styles from './MainBody.less';

import Category from '../../routes/routeCategory/Category';
import Repository from '../../routes/routeRepository/Repository';

class MainBody extends React.Component {
  render() {
    return (
      <div className={ styles.root }>
        <Route path='/index/category' component={ Category }/>
        <Route path='/index/repository' component={ Repository }/>
      </div>
    )
  }
}

export default MainBody;
