import React from 'react';
import { Affix } from 'antd';

import styles from './IndexPage.less';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainBody from '../../components/MainBody/MainBody';

class IndexPage extends React.Component {
  render() {
    return (
      <div >
        <Header />
        <div className={styles.container} >
          <Affix>
            <Sidebar />
          </Affix>
          <MainBody />
        </div >
      </div >
    );
  }
}

export default IndexPage;
