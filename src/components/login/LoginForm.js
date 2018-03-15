import React from 'react';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import config from '../../utils/config';
import styles from './LoginForm.less';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        //  TODO：请求登录接口
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container} >
        <div className={styles.logo} >
          <img src={config.logo} alt="logo" />
          <span >{config.name}</span >
        </div >
        <Form onSubmit={this.handleSubmit} >
          <FormItem >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '用户名不能为空' }],
            })(
              <Input prefix={<Icon type="user" />} placeholder="Username" />
            )}
          </FormItem >
          <FormItem >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空' }],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
            )}
          </FormItem >
          <FormItem >
            {getFieldDecorator('remember', {
              initialValue: true,
            })(
              <Checkbox >记住用户</Checkbox >
            )}
            <Button type="primary" htmlType="submit" className={styles.loginBtn} >
              登录
            </Button >
          </FormItem >
        </Form >
      </div >
    );
  }
}

const FinalLoginForm = Form.create()(LoginForm);

export default FinalLoginForm;
