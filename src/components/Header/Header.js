import React from 'react';
import { connect } from 'dva';
import { Avatar, Button, Divider, Icon, Dropdown  } from 'antd';

import styles from './Header.less';

import { systemInfo } from '../../utils/Constant';

class Header extends React.Component {

  toggleCollapse = () => {
    const { dispatch } = this.props;
    let { collapsed } = this.props.header;
    dispatch({ type: 'header/r_updateState', payload: { collapsed: !collapsed } })
  };

  toggleScreen = () => {
    // Check the full screen capability of the browser.
    const doc = document;
    const docElm = document.documentElement;
    const fullScreen = [document.fullscreen, document.mozFullScreen, document.webkitIsFullScreen, document.msFullscreenElement];
    let isFullScreen;
    fullScreen.forEach((item) => {
      if (item !== undefined) {
        isFullScreen = item;
      }
    });
    if (isFullScreen) {
      (doc.exitFullscreen || doc.webkitCancelFullScreen || doc.mozCancelFullScreen || doc.msExitFullscreen).call(doc)
    } else {
      (docElm.requestFullscreen || docElm.webkitRequestFullscreen || docElm.mozRequestFullscreen || docElm.msRequestFullscreen).call(docElm);
    }
  };

  render() {
    const { collapsed, userName, authName, account } = this.props.header;
    const content = (
      <div className={ styles.popBox }>
        <Avatar style={ { backgroundColor: '#87d068' } } icon="user" size="large"/>
        <p className={ styles.auth }>权限：{ authName }</p>
        <p>账号：{ account }</p>
        <Divider/>
        <div style={ { display: 'flex', justifyContent: 'space-between' } }>
          <Button size="small" type="primary">个人中心</Button>
          <Button size="small" type="danger">注销</Button>
        </div>
      </div>
    );
    return (
      <div className={ styles.container }>

        <div className={ styles.left }>
          <div className={ styles.systemInfo }>
            <Icon type="yuque"/><span>{ systemInfo }</span>
          </div>
          <div className={ styles.collapseIcon } onClick={ this.toggleCollapse }>
            <Icon type={ collapsed ? 'menu-unfold' : 'menu-fold' }
                  style={ { color: '#fff', fontSize: '20px' } }/>
          </div>
        </div>

        <div className={ styles.right }>
          <div className={ styles.smallPhoto }>
            <Avatar style={ { backgroundColor: '#87d068' } } icon="user" shape="square"/>
          </div>
          <Dropdown  overlay={ content } trigger="click" size="large">
            <div className={ styles.userInfo }>
              <span>你好，{ userName }</span><Icon type="caret-down"/>
            </div>
          </Dropdown>
          <div className={ styles.fullScreen } onClick={ this.toggleScreen }>
            <Icon type="arrows-alt"/>
          </div>
        </div>

      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    header: state.header,
  };
}

export default connect(mapStateToProps)(Header);
