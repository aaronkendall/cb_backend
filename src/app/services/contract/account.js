import ContractBase from './contractBase';
import Fighter from '../../models/fighter.model';
import { seedNum } from '../../utils/fighterUtils';

class Account extends ContractBase {
  constructor(provider) {
    super(provider);
  }

  getFightersForAccount() {
    return this.contract.getFightersForAddress.call(this.accountAddress)
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
          return {
            fighterFound: true,
            fighter: this.getInfoForFighter(result.logs[0].args.fighterId.toNumber())
          }
        }
        return { fighterFound: false };
      })
      .catch(error => console.log('Error searching for fighter', error));
  }

  trainFighter(id, attribute) {
    return this.contract.trainFighter(id, attribute, seedNum());
  }

  healFighter(id) {
    return this.contract.healFighter(id);
  }

  makeFighterAvailableForSale(id, price) {
    return this.contract.makeFighterAvailableForSale(id, price);
  }

  makeFighterAvailableForBrawl(id) {
    return this.contract.makeFighterAvailableForBrawl(id);
  }
}

export default Account;
