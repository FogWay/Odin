import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Button, Form, Input, Table, Popconfirm, Tag, Spin, AutoComplete, Col } from 'antd';

import styles from './Repository.less';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

class Repository extends React.Component {
  addRepository = (e) => {
    e.preventDefault();
    const { validateFields, getFieldValue } = this.props.form;
    validateFields((err) => {
      if (err) {
        return false;
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const pagination = {
      total: this.props.repository.total,
      onChange: (page) => {
        this.props.dispatch({
          type: 'category/r_updateState',
          payload: { currentPage: page }
        });
        this.props.dispatch({ type: 'category/e_queryRepository' });
      }
    };
    const children = this.props.repository.allCategory.map((item) => {
      return <Option key={ item.id }>{ item.name }</Option>;
    });
    const columns = [{
      title: '扎编号',
      dataIndex: 'number',
      render: (text) => (<Tag color="#108ee9">{ text }</Tag>)
    }, {
      title: '所属种类',
      dataIndex: 'kindName',
      render: (text) => (<Tag>{ text }</Tag>)
    }, {
      title: '当前片数',
      dataIndex: 'leftCount',
      render: (text) => (<Tag color="#87d068">{ text }</Tag>)
    }, {
      title: '当前面积',
      dataIndex: 'leftArea',
      render: (text) => (<Tag color="#87d068">{ text }</Tag>)
    }, {
      title: '创建时间',
      dataIndex: 'createAt',
      render: (text) => (<Tag>{ text }</Tag>)
    }, {
      title: '更新时间',
      dataIndex: 'updateAt',
      render: (text) => (<Tag>{ text }</Tag>)
    }, {
      title: '操作人员',
      dataIndex: 'opUserName',
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
          <Breadcrumb.Item>库存管理</Breadcrumb.Item>
        </Breadcrumb>

        <Form onSubmit={ this.addRepository } layout="inline" className={ styles.formItem }>
          <FormItem>
            { getFieldDecorator('kind', {
              rules: [{
                required: true,
                message: '请填写新增扎片数',
              }],
            })(
              <AutoComplete
                addonBefore="ss"
                style={ { width: 200 } }
                placeholder="板材种类"
                filterOption={ (inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 }
              >
                { children }
              </AutoComplete>
            ) }
          </FormItem>
          <FormItem>
            { getFieldDecorator('totalCount', {
              rules: [{
                required: true,
                message: '请填写新增扎片数',
              }],
            })(
              <Input placeholder="片数"/>
            ) }
          </FormItem>
          <FormItem>
            { getFieldDecorator('totalArea', {
              rules: [{
                required: true,
                message: '请填写新增扎总面积',
              }],
            })(
              <Input placeholder="总面积"/>
            ) }
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" loading={ this.props.repository.addButtonLoading }>
              添加种类
            </Button>
          </FormItem>
        </Form>

        <Spin spinning={ this.props.loading.models.repository }>
          <Table dataSource={ this.props.repository.dataSource }
                 columns={ columns }
                 rowKey={ record => record.id }
                 pagination={ pagination }
                 bordered/>
        </Spin>
      </div>
    )
  }
}

const FinalRepositoryManage = Form.create()(Repository);


function mapStateToProps(state) {
  return {
    loading: state.loading,
    repository: state.repository
  }
}


export default connect(mapStateToProps)(FinalRepositoryManage);
