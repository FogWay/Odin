import React from 'react';
import { connect } from 'dva';
import { Avatar, Icon, Popover, Col } from 'antd';

import styles from './Headernav.less';

import { logo, systemInfo } from '../../utils/constant';

class HeaderNav extends React.Component {

  toggleCollapse = () => {
    const { dispatch } = this.props;
    let { collapsed } = this.props.header;
    dispatch({ type: 'header/r_setCollapseStatus', payload: { collapsed: !collapsed } })
  };

  toggleScreen = () => {
    const { dispatch } = this.props;
    const { isFullScreen } = this.props.header;
    const docElm = document.documentElement;
    const fullScreen = () => {
      if (docElm.requestFullscreen) {
        docElm.requestFullScreen();
      }
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
      else {
        return false;
      }
    };
    const cancelFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    };
    if (isFullScreen) {
      dispatch({ type: 'header/r_setScreenStatus', payload: { isFullScreen: false } });
      cancelFullScreen();
    } else {
      dispatch({ type: 'header/r_setScreenStatus', payload: { isFullScreen: true } });
      fullScreen();
    }
  };

  render() {
    const content = (
      <p>dd</p>
      //  TODO:用户操作（注销；个人信息）
    );
    const { collapsed } = this.props.header;

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
          <Popover content={ content }>
            <div className={ styles.userInfo }>
              <span>你好，不辞远</span>
              <Avatar size="large" src={ logo } className={ styles.photo }></Avatar>
            </div>
          </Popover>
          <div className={ styles.fullScreen }>
            <Icon type="arrows-alt" onClick={ this.toggleScreen }/>
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

export default connect(mapStateToProps)(HeaderNav);
