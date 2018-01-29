import { toast } from 'react-toastify'
import ethunits from 'ethereum-units'
import axios from 'axios'

import ContractBase from './contractBase'
import { seedNum } from '../../utils/fighterUtils'
import {
  TRAINING_COST,
  DEFAULT_SEARCH_GAS,
  DEFAULT_GAS,
  HEALING_PRICE_INCREASE,
  DEFAULT_CALL_GAS,
  MARKETPLACE_ENDPOINT,
  ARENA_ENDPOINT
} from '../../utils/constants'

class Account extends ContractBase {
  constructor(provider, defaultAccount) {
    super(provider, defaultAccount);
  }

  getFightersForAccount() {
    return this.contract.getFightersForAddress.call(this.accountAddress, { gas: DEFAULT_CALL_GAS })
      .then(result => result.map(id => this.getInfoForFighter(id.toNumber())))
      .catch(error => console.log('Error getting fighters for account', this.accountAddress, error));
  }

  searchForFighter() {
    return this.contract.searchForFighter(seedNum(), { gas: DEFAULT_SEARCH_GAS })
      .then(result => {
        if (result.logs.length > 1) {
          const fighterId = result.logs[0].args.fighterId.toNumber();
          toast.success(`Fighter #${fighterId} Found!`);
          return {
            fighterFound: true,
            fighter: this.getInfoForFighter(fighterId)
          }
        }
        toast.info('No Fighter Found :(');
        return { fighterFound: false };
      })
      .catch((error) => {
        toast.error('Error searching for fighter :(');
        console.log('Error searching for fighter', error);
      });
  }

  trainFighter(id, attribute) {
    return this.contract.trainFighter(id, attribute, seedNum(), { value: TRAINING_COST })
      .then((result) => {
        const { attribute } = result.logs[0].args;
        let { increaseValue, fighterId } = result.logs[0].args;
        increaseValue = increaseValue.toNumber();
        fighterId = fighterId.toNumber();

        toast.success(`Fighter #${fighterId}'s ${attribute} increased by ${increaseValue}!`);

        return {
          attribute,
          increaseValue,
          fighterId
        }
      });
  }

  healFighter(id) {
    return this.contract.healFighter(id, { value: (TRAINING_COST * HEALING_PRICE_INCREASE) })
      .then(result => toast.success(`Fighter #${id} has been healed!`));
  }

  makeFighterAvailableForSale(fighter, price) {
    return this.contract.makeFighterAvailableForSale(fighter.id, price)
      .then((result) => {
        axios.post(`${MARKETPLACE_ENDPOINT}/add`, { fighter, price })
        toast.success(`Fighter #${id} has been made available for sale at ${ethunits.convert(price, 'wei', 'ether').floatValue()} ETH`)
      });
  }

  makeFighterAvailableForBrawl(fighter) {
    return this.contract.makeFighterAvailableForBrawl(fighter.id)
      .then((result) => {
        axios.post(`${ARENA_ENDPOINT}/add`, { fighter })
        toast.success(`Fighter #${id} has entered the arena!`)
      });
  }

  cancelFighterSale(id) {
    return this.contract.removeFighterFromSale(id, { gas: DEFAULT_GAS })
      .then((result) => {
        axios.delete(`${MARKETPLACE_ENDPOINT}/remove/${id}`)
        toast.info(`Sale of fighter #${id} has been cancelled`)
      })
      .catch(error => { toast.error(`Cannot cancel sale!`); console.log(error) });
  }

  cancelFighterBrawl(id) {
    return this.contract.removeFighterFromArena(id, { gas: DEFAULT_GAS })
      .then((result) => {
        axios.delete(`${ARENA_ENDPOINT}/remove/${id}`)
        toast.info(`Fighter #${id} has been removed from the arena!`)
      })
      .catch(error => { toast.error(`Cannot cancel sale!`); console.log(error) });
  }
}

export default Account;
