import React from 'react';
import { connect } from 'react-redux';
import reduxConnectProps from '../../utils/redux-connect-props';

@connect(store => ({

}))
class Training extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<h1>Training</h1>);
  }
}

export default reduxConnectProps(Training);
