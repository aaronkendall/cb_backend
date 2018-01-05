import React from 'react';
import { connect } from 'react-redux';
import reduxConnectProps from '../../utils/redux-connect-props';

import AccountService from '../../services/contract/account';
import { addFighters } from '../../actions/accountActions';

@connect(store => ({
  provider: store.core.provider,
  account: store.account
}))
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.accountService = new AccountService(props.provider);
  }

  componentWillMount() {
    this.accountService.getFightersForAccount()
      .then(fightersPromiseArray => Promise.all(fightersPromiseArray))
      .then(fighters => this.props.dispatch(addFighters(fighters)));
  }

  render() {
    console.log(this.props.account.fighters);
    return (
      <div>
        <h1>Account</h1>
        <button onClick={() => { this.accountService.searchForFighter() }}>Find</button>
      </div>
    );
  }
}

export default reduxConnectProps(Account);
