import React from 'react';
import { connect } from 'react-redux';
import reduxConnectProps from '../../utils/redux-connect-props';

@connect(store => ({

}))
class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<h1>Home</h1>);
  }
}

export default reduxConnectProps(Home);
