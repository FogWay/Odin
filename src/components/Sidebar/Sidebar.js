import React from 'react';
import { connect } from 'dva';
import { Icon, Menu, Switch } from 'antd';

import styles from './Sidebar.less';

import { systemInfo } from '../../utils/Constant';

const SubMenu = Menu.SubMenu;

class Sidebar extends React.Component {

  render() {
    const { collapsed } = this.props.header;
    return (
      <div className={styles.root} >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <div className={styles.systemInfo} >
            <Icon type="github" />
            {collapsed ? '' : <p >{systemInfo}</p >}
          </div >
          <Menu.Item key="1" >
            <Icon type="pie-chart" />
            <span >Option 1</span >
          </Menu.Item >
          <Menu.Item key="2" >
            <Icon type="desktop" />
            <span >Option 2</span >
          </Menu.Item >
          <Menu.Item key="3" >
            <Icon type="inbox" />
            <span >Option 3</span >
          </Menu.Item >
          <SubMenu key="sub1" title={<span ><Icon type="mail" /><span >Navigation One</span ></span >} >
            <Menu.Item key="5" >Option 5</Menu.Item >
            <Menu.Item key="6" >Option 6</Menu.Item >
          </SubMenu >
          <SubMenu key="sub2" title={<span ><Icon type="appstore" /><span >Navigation Two</span ></span >} >
            <Menu.Item key="9" >Option 7</Menu.Item >
            <Menu.Item key="10" >Option 8</Menu.Item >
          </SubMenu >
          <div className={styles.chooseTheme}>
            {collapsed ? '' : <span ><Icon type="bulb" />切换主题</span >}
            <Switch />
          </div >
        </Menu >
      </div >
    )
  }
}


function mapStateToProps(state) {
  return {
    header: state.header
  };
}

export default connect(mapStateToProps)(Sidebar);
