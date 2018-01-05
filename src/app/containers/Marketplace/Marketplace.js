import React from 'react';
import { connect } from 'react-redux';
import reduxConnectProps from '../../utils/redux-connect-props';

@connect(store => ({

}))
class Marketplace extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<h1>Marketplace</h1>);
  }
}

export default reduxConnectProps(Marketplace);
