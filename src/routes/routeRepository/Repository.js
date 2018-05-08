import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Button, Form, Input, Table, Icon, Tag, Spin, AutoComplete, DatePicker, Modal } from 'antd';
import langConfig from '../../utils/zh_CN';

import styles from './Repository.less';

const FormItem = Form.Item;
const Option = AutoComplete.Option;
const RangePicker = DatePicker.RangePicker;

class Repository extends React.Component {
  addRepository = (e) => {
    e.preventDefault();
    const { validateFields, getFieldValue } = this.props.form;
    validateFields((err) => {
      if (err) {
        return false;
      }
      this.props.dispatch({
        type: 'repository/r_updateState',
        payload: { addButtonLoading: true }
      });
      this.props.dispatch({
        type: 'repository/e_addRepository',
        payload: {
          kindId: getFieldValue('kind'),
          totalCount: getFieldValue('totalCount'),
          totalArea: getFieldValue('totalArea')
        }
      });
    });
  };
  queryRepository = () => {
    this.props.dispatch({
      type: 'repository/r_updateState',
      payload: {
        currentPage: 1,
        numbderFiltered: !!this.props.repository.numberFilterValue,
        numberFilterVisible: false,
        kindNameFiltered: !!this.props.repository.kindNameFilterValue,
        kindNameFilterVisible: false
      }
    });
    this.props.dispatch({
      type: 'repository/e_queryRepository'
    });
  };
  numberChange = (e) => {
    this.props.dispatch({
      type: 'repository/r_updateState',
      payload: { numberFilterValue: e.target.value }
    });
  };
  kindNameChange = (value) => {
    this.props.dispatch({
      type: 'repository/r_updateState',
      payload: { kindNameFilterValue: value }
    });
  };
  timeChange = (dates, dateStrings) => {
    this.props.dispatch({
      type: 'repository/r_updateState',
      payload: {
        createTimeFilterValue: dateStrings[0] ? dateStrings[0] + ' 00:00:00' : '',
        endTimeFilterValue: dateStrings[1] ? dateStrings[1] + ' 23:59:59' : ''
      }
    });
    this.props.dispatch({
      type: 'repository/e_queryRepository'
    });
  };
  showDeliveryModal = () => {
    this.props.dispatch({
      type: 'repository/r_updateState',
      payload: { deliveryModalVisible: true }
    });
  };
  cancelDelivery = () => {
    this.props.dispatch({
      type: 'repository/r_updateState',
      payload: { deliveryModalVisible: false }
    });
  };
  confirmDelivery = () => {
    this.props.dispatch({
      type: 'repository/r_updateState',
      payload: { deliveryModalVisible: false }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // pagination
    const pagination = {
      total: this.props.repository.total,
      showTotal: (total) => `共 ${total} 条`,
      current: this.props.repository.currentPage,
      onChange: (page) => {
        this.props.dispatch({
          type: 'repository/r_updateState',
          payload: { currentPage: page }
        });
        this.props.dispatch({ type: 'repository/e_queryRepository' });
      }
    };
    // Autocomplete items
    const addChildren = this.props.repository.allCategory.map((item) => {
      return <Option key={ item.id }>{ item.name }</Option>;
    });
    const filterChildren = this.props.repository.allCategory.map((item) => {
      return <Option key={ item.name }>{ item.name }</Option>;
    });
    // Table columns
    const columns = [{
      title: '扎编号',
      dataIndex: 'number',
      filterIcon: <Icon type="filter"
                        style={ { color: !!this.props.repository.numbderFiltered ? '#108ee9' : '#aaa' } }/>,
      filterDropdown: (
        <div className={ styles.formFilterDropdown }>
          <Input
            placeholder="编号"
            onChange={ this.numberChange }
            onPressEnter={ this.queryRepository }
          />
          <Button type="primary" onClick={ this.queryRepository }>搜索</Button>
        </div>
      ),
      filterDropdownVisible: this.props.repository.numberFilterVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.props.dispatch({
          type: 'repository/r_updateState',
          payload: { numberFilterVisible: visible }
        });
      },
      render: (text) => (<Tag color="#108ee9">{ text }</Tag>)
    }, {
      title: '所属种类',
      dataIndex: 'kindName',
      filterIcon: <Icon type="filter"
                        style={ { color: !!this.props.repository.kindNameFiltered ? '#108ee9' : '#aaa' } }/>,
      filterDropdown: (
        <div className={ styles.formFilterDropdown }>
          <AutoComplete
            placeholder="板材种类"
            onChange={ this.kindNameChange }
            filterOption={ (inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 }
          >
            { filterChildren }
          </AutoComplete>
          <Button type="primary" onClick={ this.queryRepository }>搜索</Button>
        </div>
      ),
      filterDropdownVisible: this.props.repository.kindNameFilterVisible,
      onFilterDropdownVisibleChange: (visible) => {
        if (visible === true) {
          this.props.dispatch({
            type: 'repository/r_updateState',
            payload: { kindNameFilterVisible: true }
          });
        }
      },
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
      filterIcon: <Icon type="filter"
                        style={ { color: !!this.props.repository.createTimeFilterValue || !!this.props.repository.endTimeFilterValue ? '#108ee9' : '#aaa' } }/>,
      filterDropdown: (
        <RangePicker
          format="YYYY-MM-DD"
          onChange={ this.timeChange }
          locale={ langConfig }
        />
      ),
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
      render: (text, record) => (
        <div className={ styles.deliveryButton }>
          <Button disabled={ !record.leftArea && !record.leftCount } type="primary"
                  onClick={ this.showDeliveryModal }>原材料出库
          </Button>
          <Button disabled={ !record.backCargoList.length } type="primary">返库板材出库</Button>
        </div>
      )
    }];

    return (
      <div className={ styles.root }>

        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>库存管理</Breadcrumb.Item>
        </Breadcrumb>

        <Modal
          title={this.props.repository.deliveryModalTitle}
          visible={ this.props.repository.deliveryModalVisible }
          onOk={ this.confirmDelivery }
          okText="确认"
          onCancel={ this.cancelDelivery }
          cancelText="取消"
        >
        </Modal>

        <Form onSubmit={ this.addRepository } layout="inline" className={ styles.formItem }>
          <FormItem label="板材种类">
            { getFieldDecorator('kind', {
              rules: [{
                required: true,
                message: '请填写新增扎所属种类',
              }],
            })(
              <AutoComplete
                placeholder="板材种类"
                filterOption={ (inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 }
              >
                { addChildren }
              </AutoComplete>
            ) }
          </FormItem>
          <FormItem label="新扎片数">
            { getFieldDecorator('totalCount', {
              rules: [{
                required: true,
                message: '请填写新增扎片数',
              }],
            })(
              <Input placeholder="片数" addonAfter="片"/>
            ) }
          </FormItem>
          <FormItem label="新扎总面积">
            { getFieldDecorator('totalArea', {
              rules: [{
                required: true,
                message: '请填写新增扎总面积',
              }],
            })(
              <Input placeholder="总面积" addonAfter="平方米"/>
            ) }
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" loading={ this.props.repository.addButtonLoading }>
              添加新扎
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
