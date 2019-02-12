import React, { Component } from 'react';
import { connect } from 'react-redux';

import { action1, action2 } from '../actions/myActions';

class ComponentTest extends Component {
  render(){
    return(
      <div className='ComponentTest'>
        {/* content */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  prop: state.state1.propReducer1,
  //add here the props you need from the store state
});

export default connect(mapStateToProps, { action1, action2 })(ComponentTest);
