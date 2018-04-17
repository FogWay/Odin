import React from 'react';
import { connect } from 'dva';
import { Button, Checkbox, Form, Icon, Input, Spin } from 'antd';

import styles from './Login.less';

import { logoImage, systemName } from '../../utils/Constant';

const FormItem = Form.Item;

class Login extends React.Component {
  remChange = (e) => {
    this.props.dispatch({
      type: 'login/r_updateState',
      payload: { isRemember: e.target.checked }
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields, getFieldValue } = this.props.form;
    validateFields((err) => {
      if (err) {
        return false;
      }
      this.props.dispatch({
        type: 'login/r_setSpinStatus',
        payload: { loginLoading: true }
      });
      this.props.dispatch({
        type: 'login/e_login',
        payload: {
          loginName: getFieldValue('userName'),
          password: getFieldValue('password')
        }
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={ styles.root }>
        <div className={ styles.container }>
          <div className={ styles.logo }>
            <img src={ logoImage } alt="logo"/>
            <span>{ systemName }</span>
          </div>
          <Form onSubmit={ this.handleSubmit }>
            <FormItem hasFeedback>
              { getFieldDecorator('userName', {
                initialValue: this.props.login.defaultUsername,
                rules: [{
                  required: true,
                  message: '用户名不能为空',
                }],
              })(
                <Input prefix={ <Icon type="user"/> }
                       placeholder="账号"/>
              ) }
            </FormItem>
            <FormItem style={ { marginTop: '10px' } } hasFeedback>
              { getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不能为空' }],
              })(
                <Input prefix={ <Icon type="lock"/> }
                       type="password"
                       placeholder="密码"/>
              ) }
            </FormItem>
            <FormItem>
              <Checkbox checked={ this.props.login.isRemember }
                        onChange={ this.remChange }>
                记住用户
              </Checkbox>
            </FormItem>
            <Spin spinning={ this.props.login.loginLoading }>
              <Button type="primary"
                      htmlType="submit"
                      className={ styles.loginBtn }>
                登录
              </Button>
            </Spin>
          </Form>
        </div>
      </div>
    );
  }
}

const FinalLogin = Form.create()(Login);

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

export default connect(mapStateToProps)(FinalLogin);
