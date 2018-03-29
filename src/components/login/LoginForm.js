import React from 'react';
import { Button, Checkbox, Form, Icon, Input, Spin } from 'antd';

import styles from './LoginForm.less';

import { logo, name } from '../../utils/constant';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  remChange = (e) => {
    this.props.dispatch({
      type: 'login/r_setRemember',
      payload: { remember: e.target.checked }
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { validateFields, getFieldValue } = this.props.form;
    validateFields((err) => {
      if (err) {
        return false;
      }
      dispatch({
        type: 'login/r_setSpinStatus',
        payload: { loginLoading: true }
      });
      const params = {
        username: getFieldValue('userName'),
        password: getFieldValue('password')
      };
      dispatch({
        type: 'login/e_login',
        payload: params
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container} >
        <div className={styles.logo} >
          <img src={logo} alt="logo" />
          <span >{name}</span >
        </div >
        <Form onSubmit={this.handleSubmit} >
          <FormItem >
            {getFieldDecorator('userName', {
              initialValue: this.props.login.defaultUsername,
              rules: [{
                required: true,
                message: '用户名不能为空',
              }],
            })(
              <Input prefix={<Icon type="user" />}
                     placeholder="Username"
                     className={styles.transBack} />
            )}
          </FormItem >
          <FormItem >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空' }],
            })(
              <Input prefix={<Icon type="lock" />}
                     type="password"
                     placeholder="Password"
                     className={styles.transBack} />
            )}
          </FormItem >
          <FormItem >
            <Checkbox className={styles.transBack}
                      checked={this.props.login.remember}
                      onChange={this.remChange} >
              记住用户
            </Checkbox >
          </FormItem >
          <Spin spinning={this.props.login.loginLoading} >
            <Button type="primary"
                    htmlType="submit"
                    className={styles.loginBtn} >
              登录
            </Button >
          </Spin >
        </Form >
      </div >
    );
  }
}

const FinalLoginForm = Form.create()(LoginForm);

export default FinalLoginForm;
