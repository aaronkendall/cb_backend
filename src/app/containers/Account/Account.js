import React from 'react';
import { connect } from 'react-redux';
import reduxConnectProps from '../../utils/redux-connect-props';

import AccountService from '../../services/contract/account';
import { addFighters, increaseFighterStats, healFighter } from '../../actions/accountActions';

@connect(store => ({
  provider: store.core.provider,
  defaultAccount: store.core.defaultAccount,
  account: store.account
}))
class Account extends React.Component {
  constructor(props) {
    super(props);
    const { provider, defaultAccount } = props;
    this.accountService = new AccountService(provider, defaultAccount);
  }

  componentWillMount() {
    if (this.props.account.fighters.length === 0) {
      this.accountService.getFightersForAccount()
        .then(fightersPromiseArray => Promise.all(fightersPromiseArray))
        .then(fighters => this.props.dispatch(addFighters(fighters)));
    }
  }

  handleFighterSearch() {
    this.accountService.searchForFighter()
      .then(result => {
        if (result.fighterFound) {
          result.fighter
            .then(newFighter => this.props.dispatch(addFighters([newFighter])));
        }
      });
  }

  handleTrainFighter(id, attribute) {
    this.accountService.trainFighter()
      .then(result => this.props.dispatch(increaseFighterStats(result)))
      .catch(error => console.log('Error training fighter ', id, error));
  }

  handleHeal(id) {
    this.accountService.healFighter()
      .then(result => this.props.dispatch(healFighter(id)))
      .catch(error => console.log('Error healing fighter ', id, error));
  }

  handleAddToMarket(id, price) {
    this.accountService.makeFighterAvailableForSale(id, price)
      .then(result => console.log(result)) // probably want to do something on the UI to display this has happened
      .catch(error => console.log('Error adding fighter to market ', id, price));
  }

  handleAddToArena(id) {
    this.accountService.makeFighterAvailableForBrawl(id)
      .then(result => console.log(result)) // Same as above, some notification or something
      .catch(error => console.log('Error adding fighter to arena ', id, price));
  }

  render() {
    console.log(this.props.account.fighters);
    return (
      <div className="page-container">
        <h1>Account</h1>
        <button onClick={() => this.handleFighterSearch()}>Find</button>
      </div>
    );
  }
}

export default reduxConnectProps(Account);
