import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Button, Form, Input, Table, Popconfirm, Tag, Spin } from 'antd';


class Repository extends React.Component {
  render() {
    return (
      <p>Repository</p>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Repository);
