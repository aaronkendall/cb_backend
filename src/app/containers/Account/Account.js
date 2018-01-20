import React from 'react';
import { connect } from 'react-redux';
import reduxConnectProps from '../../utils/redux-connect-props';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ethunits from 'ethereum-units';

import AccountService from '../../services/contract/account';
import {
  populateFighters,
  searchForFighter,
  trainFighter,
  healFighterThunk,
  approveFighterForSale,
  approveFighterForArena,
  cancelFighterSale,
  cancelFighterBrawl
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
    this.props.dispatch(trainFighter(this.accountService, id, attribute))
  }

  handleHeal(id) {
    this.props.dispatch(healFighterThunk(this.accountService, id, attribute))
  }

  handleAddToMarket(e, id) {
    e.preventDefault()

    const { modalFighterPrice } = this.props
    const weiPrice = ethunits.convert(parseFloat(modalFighterPrice), 'ether', 'wei').floatValue()

    this.props.dispatch(approveFighterForSale(this.accountService, id, weiPrice))
  }

  handleAddToArena(id) {
    this.props.dispatch(approveFighterForArena(this.accountService, id))
  }

  handleRemoveFighterFromSale(id) {
    this.props.dispatch(cancelFighterSale(this.accountService, id))
  }

  handleRemoveFighterFromArena(id) {
    this.props.dispatch(cancelFighterBrawl(this.accountService, id))
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
