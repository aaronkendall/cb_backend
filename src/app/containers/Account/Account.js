import React from 'react';
import { connect } from 'react-redux';
import reduxConnectProps from '../../utils/redux-connect-props';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import AccountService from '../../services/contract/account';
import { addFighters, increaseFighterStats, healFighter } from '../../actions/accountActions';
import { showModal, closeModal, updateFighterPrice } from '../../actions/modalActions';

import CardContainer from '../../components/Cards/CardContainer';
import Button from '../../components/Button';
import FighterAccountModal from '../../components/modal/FighterAccountModal';

@connect(store => ({
  provider: store.core.provider,
  defaultAccount: store.core.defaultAccount,
  account: store.account,
  userIsSignedIn: store.core.userIsSignedIn,
  modalFighterPrice: store.modal.fighter.price
}))
class Account extends React.Component {
  constructor(props) {
    super(props);
    const { provider, defaultAccount } = this.props;
    this.accountService = new AccountService(provider, defaultAccount);
  }

  componentWillMount() {
    const { fighters } = this.props.account;
    const { userIsSignedIn } = this.props;

    if (fighters.length === 0 && userIsSignedIn) {
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
      .catch(error => console.log('Error adding fighter to market ', id, price));
  }

  handleAddToArena(id) {
    this.accountService.makeFighterAvailableForBrawl(id)
      .catch(error => console.log('Error adding fighter to arena ', id, price));
  }

  handleCardClick(id) {
    const { dispatch, account, modalFighterPrice } = this.props;
    const fighter = account.fighters.find(fighter => fighter.id === id);
    if (!fighter) return console.log('No fighter selected!');

    dispatch(showModal(
      <FighterAccountModal
        fighter={fighter}
        handleTrainFighter={(id, attribute) => this.handleTrainFighter(id, attribute)}
        handleHealFighter={id => this.handleHeal(id)}
        handleCloseModal={() => dispatch(closeModal())}
        handleAddFighterToArena={id => this.handleAddToArena(id)}
        handleAddFighterToMarketplace={id => this.handleAddToMarket(id, price)}
        handleUpdatePrice={e => dispatch(updateFighterPrice(e.target.value))}
        price={modalFighterPrice}
        />
    ));
  }

  render() {
    const { userIsSignedIn, account } = this.props;
    const { fighters } = account;

    if (!userIsSignedIn) {
      return <Redirect to={{ pathname: '/signin' }} />;
    }

    return (
      <div className="page-container">
        <Button type="red" text="Find Fighters" handleClick={() => this.handleFighterSearch()} />
        {fighters.length > 0 && <CardContainer items={fighters} handleClick={id => this.handleCardClick(id)} />}
        {fighters.length === 0 && <p>You don't have any fighters!</p>}
      </div>
    );
  }
}

export default reduxConnectProps(Account);
