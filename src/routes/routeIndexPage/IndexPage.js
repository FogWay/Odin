import React from 'react';

import styles from './IndexPage.less';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainBody from '../../components/MainBody/MainBody';

class IndexPage extends React.Component {
  render() {
    return (
      <div className={styles.root} >
        <Sidebar />
        <div className={styles.layout} >
          <Header />
          <div className={styles.mainBody} >
            <MainBody />
          </div >
        </div >
      </div >
    );
  }
}

export default IndexPage;
