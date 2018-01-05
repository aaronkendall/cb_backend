import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import reduxConnectProps from '../../utils/redux-connect-props';

import initialiseWeb3 from '../../utils/web3Setup';

@connect(store => ({
  userIsSignedIn: store.core.userIsSignedIn
}))
class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      if (this.props.userIsSignedIn) {
        return <Redirect to={{ pathname: '/account' }} />;
      }

      return (
        <div>
          <h1>Sign In</h1>
          <button onClick={() => initialiseWeb3()}>MetaMask is On</button>
        </div>
      );
  }
}

export default reduxConnectProps(SignIn);
