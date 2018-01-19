import React from 'react';
import { connect } from 'react-redux';
import reduxConnectProps from '../../utils/redux-connect-props';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ethunits from 'ethereum-units';

import AccountService from '../../services/contract/account';
import {
  addFighters,
  increaseFighterStats,
  healFighter,
  addFighterToMarketplace,
  removeFighterFromMarketplace,
  addFighterToArena,
  removeFighterFromArena,
  populateFighters,
  searchForFighter
} from '../../actions/accountActions';
import { showModal, closeModal, updateFighterPrice } from '../../actions/modalActions';
import { TRAINING_COST } from '../../utils/constants';

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
      this.props.dispatch(populateFighters(this.accountService))
    }
  }

  handleFighterSearch() {
    this.props.dispatch(searchForFighter(this.accountService))
  }

  handleTrainFighter(id, attribute) {
    this.accountService.trainFighter(id, attribute)
      .then(result => this.props.dispatch(increaseFighterStats(result)))
      .catch(error => console.log('Error training fighter ', id, error));
  }

  handleHeal(id) {
    this.accountService.healFighter(id)
      .then(result => this.props.dispatch(healFighter(id)))
      .catch(error => console.log('Error healing fighter ', id, error));
  }

  handleAddToMarket(e, id) {
    e.preventDefault();

    const { modalFighterPrice } = this.props;
    const weiPrice = ethunits.convert(parseFloat(modalFighterPrice), 'ether', 'wei').floatValue();

    this.accountService.makeFighterAvailableForSale(id, weiPrice)
      .then(result => this.props.dispatch(addFighterToMarketplace(id)))
      .catch(error => console.log('Error adding fighter to market ', id, price));
  }

  handleAddToArena(id) {
    this.accountService.makeFighterAvailableForBrawl(id)
      .then(result => this.props.dispatch(addFighterToArena(id)))
      .catch(error => console.log('Error adding fighter to arena ', id, price));
  }

  handleRemoveFighterFromSale(id) {
    this.accountService.cancelFighterSale(id)
      .then(result => this.props.dispatch(removeFighterFromMarketplace(id)))
      .catch(error => console.log('Error removing fighter from marketplace', id));
  }

  handleRemoveFighterFromArena(id) {
    this.accountService.cancelFighterBrawl(id)
      .then(result => this.props.dispatch(removeFighterFromArena(id)))
      .catch(error => console.log('Error removing fighter from arena', id));
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
        handleAddFighterToMarketplace={(e, id) => this.handleAddToMarket(e, id)}
        handleUpdatePrice={e => dispatch(updateFighterPrice(e.target.value))}
        trainingPrice={ethunits.convert(TRAINING_COST, 'wei', 'ether').floatValue()}
        handleCancelFighterBrawl={id => this.handleRemoveFighterFromArena(id)}
        handleCancelFighterSale={id => this.handleRemoveFighterFromSale(id)}
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
