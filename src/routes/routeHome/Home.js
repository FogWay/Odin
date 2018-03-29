import React from 'react';
import { connect } from 'dva';

import styles from './Home.less';

import HeaderNav from '../../components/Home/HeaderNav';
import SidebarNav from '../../components/Home/SidebarNav';
import ContentArea from '../../components/Home/ContentArea';

class Home extends React.Component {
  render() {
    return (
      <div >
        <HeaderNav />
        <div className={styles.container} >
          <SidebarNav />
          <ContentArea />
        </div >
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

export default connect(mapStateToProps)(Home);
