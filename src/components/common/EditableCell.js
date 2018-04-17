import React from 'react';
import { Input, Icon, Tag } from 'antd';

import styles from './EditableCell.less';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }
  check = () => {
    this.setState({ editable: false });
    this.props.submitChange(this.state.value);

  }
  edit = () => {
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className={ styles.editableCell }>
        {
          editable ?
            <div className={ styles.editableCellInputWrapper }>
              <Input
                value={ value }
                onChange={ this.handleChange }
                onPressEnter={ this.check }
              />
              <Icon
                type="check"
                className={ styles.editableCellIconCheck }
                onClick={ this.check }
              />
            </div>
            :
            <div className={ styles.editableCellTextWrapper }>
              <Tag color="#108ee9">{ value }</Tag>
              <Icon
                type="edit"
                className={ styles.editableCellIcon }
                onClick={ this.edit }
              />
            </div>
        }
      </div>
    )
  }
}

export default EditableCell;
