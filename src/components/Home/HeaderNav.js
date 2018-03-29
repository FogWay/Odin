import React from 'react';
import { connect } from 'dva';
import { Avatar, Icon } from 'antd';

import styles from './Headernav.less';

import { logo, systemInfo } from '../../utils/constant';

class HeaderNav extends React.Component {

  render() {
    return (
      <div className={styles.container} >
        <ul >
          <div className={styles.floatLeft} >
            <li className={styles.systemName} >
              <Icon type="yuque" /><span >{systemInfo}</span >
            </li >
            <li className={styles.collapseIcon} >
              <Icon type='menu-unfold' style={{ color: '#fff', fontSize: '20px' }} />
            </li >
          </div >
          <div className={styles.floatRight} >
            <li className={styles.greet} >
              <span >你好，不辞远</span >
            </li >
            <li className={styles.photo} >
              <Avatar size="large" src={logo} ></Avatar >
            </li >
            <li className={styles.fullScreen} >
              <Icon type="arrows-alt" />
            </li >
          </div >
        </ul >
      </div >
    )
  }
}


function mapStateToProps(state) {
  return {
    header: state.header,
  };
}

export default connect(mapStateToProps)(HeaderNav);
