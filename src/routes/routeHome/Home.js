import React from 'react';
import { connect } from 'dva';

class Home extends React.Component {
  render() {
    return (
      <div>
        HOME
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

export default connect(mapStateToProps)(Home);
