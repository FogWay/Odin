import React from 'react';
import { connect } from 'dva';

import styles from './Login.less';

import LoginForm from '../../components/login/LoginForm';

class Login extends React.Component {
  render() {
    return (
      <div className={ styles.root }>
        <div className={ styles.blur }></div>
        <LoginForm { ...this.props }/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps)(Login);
