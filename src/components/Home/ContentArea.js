import React from 'react';
import { connect } from 'dva';

import styles from './ContentArea.less';

class ContentArea extends React.Component {
  render() {
    return (
      <div className={styles.container} >
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </div >
    )
  }
}


function mapStateToProps(state) {
  return {
    main: state.main,
  };
}

export default connect(mapStateToProps)(ContentArea);
