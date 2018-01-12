import { toast } from 'react-toastify';
import ContractBase from './contractBase';
import Fighter from '../../models/fighter.model';
import { seedNum } from '../../utils/fighterUtils';

class Account extends ContractBase {
  constructor(provider, defaultAccount) {
    super(provider, defaultAccount);
  }

  getFightersForAccount() {
    return this.contract.getFightersForAddress(this.accountAddress)
      .then(result => result.map(id => this.getInfoForFighter(id.toNumber())))
      .catch(error => console.log('Error getting fighters for account', this.accountAddress, error));
  }

  getInfoForFighter(fighterId) {
    return this.contract.getInfoForFighter(fighterId)
      .then(rawFighter => new Fighter(rawFighter, fighterId))
      .catch(error => console.log('Error getting info for fighter', fighterId, error));
  }

  searchForFighter() {
    return this.contract.searchForFighter(seedNum())
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
    return this.contract.trainFighter(id, attribute, seedNum())
      .then(result => toast.success(`Fighter #${id}'s ${attribute} increased!'`));
  }

  healFighter(id) {
    return this.contract.healFighter(id)
      .then(result => toast.success(`Fighter #${id} has been healed!`));
  }

  makeFighterAvailableForSale(id, price) {
    return this.contract.makeFighterAvailableForSale(id, price)
      .then(result => toast.info(`Fighter #${id} has been made available for sale at ${price} ETH`));
  }

  makeFighterAvailableForBrawl(id) {
    return this.contract.makeFighterAvailableForBrawl(id)
      .then(result => toast.info(`Fighter #${id} has entered the arena!`));
  }
}

export default Account;
