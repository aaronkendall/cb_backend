import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reduxConnectProps from '../utils/redux-connect-props';
import initialiseWeb3 from '../utils/web3Setup';

import NavBar from '../components/NavBar';
import Routes from '../components/Routes';

@connect(store => ({
  core: store.core
}))
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    initialiseWeb3(this.props.dispatch);
  }

  render() {
    return (
      <div className="view-container">
        <NavBar signedIn={this.props.core.userIsSignedIn} />
        <Routes />
      </div>
    );
  }
}

export default withRouter(reduxConnectProps(App));
