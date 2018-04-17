import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Button, Form, Input, Table, Popconfirm, Tag, Spin } from 'antd';

import styles from './Category.less';

import EditableCell from '../../components/common/EditableCell';

const FormItem = Form.Item;


class Category extends React.Component {
  addCategory = (e) => {
    e.preventDefault();
    const { validateFields, getFieldValue } = this.props.form;
    validateFields((err) => {
      if (err) {
        return false;
      }
      this.props.dispatch({
        type: 'category/r_updateState',
        payload: { addButtonLoading: true }
      });
      this.props.dispatch({
        type: 'category/e_addCategory',
        payload: {
          name: getFieldValue('newTypeName')
        }
      });
    });
  }
  deleteCategory = (id) => {
    this.props.dispatch({
      type: 'category/e_deleteCategory',
      payload: { kindId: id }
    });
  };
  editChange = (text, id, value) => {
    if (text === value) {
      return false;
    }
    this.props.dispatch({
      type: 'category/e_updateCategory',
      payload: { kindId: id, name: value }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const pagination = {
      total: this.props.category.total,
      onChange: (page) => {
        this.props.dispatch({
          type: 'category/r_updateState',
          payload: { currentPage: page }
        });
        this.props.dispatch({ type: 'category/e_queryCategory' });
      }
    };
    const columns = [{
      title: '种类名',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) =>
        <EditableCell value={ text }
                      submitChange={ (value) => {
                        this.editChange(text, record.id, value)
                      } }
        />

    }, {
      title: '创建时间',
      dataIndex: 'createAt',
      render: (text) => (<Tag>{ text }</Tag>)
    }, {
      title: '更新时间',
      dataIndex: 'updateAt',
      render: (text) => (<Tag>{ text }</Tag>)
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) =>
        <Popconfirm title="确认删除该种类？" okText="确认" cancelText="取消"
                    onConfirm={ () => {
                      this.deleteCategory(record.id)
                    } }>
          <Button icon="delete" type="danger"></Button>
        </Popconfirm>
    }];
    return (
      <div className={ styles.root }>

        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>种类管理</Breadcrumb.Item>
        </Breadcrumb>

        <div className={ styles.addCategory }>
          <Form onSubmit={ this.addCategory } layout="inline">
            <FormItem>
              { getFieldDecorator('newTypeName', {
                rules: [{
                  required: true,
                  message: '请填写新增种类名称',
                }],
              })(
                <Input placeholder="种类名称"/>
              ) }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" loading={ this.props.category.addButtonLoading }>
                添加种类
              </Button>
            </FormItem>
          </Form>
        </div>

        <Spin spinning={ this.props.loading.models.category }>
          <Table dataSource={ this.props.category.dataSource }
                 columns={ columns }
                 rowKey={ record => record.id }
                 pagination={ pagination }
                 bordered/>
        </Spin>
      </div>
    )
  }
}

const FinalCategoryManage = Form.create()(Category);

function mapStateToProps(state) {
  return {
    loading: state.loading,
    category: state.category
  };
}

export default connect(mapStateToProps)(FinalCategoryManage);
