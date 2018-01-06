import ContractBase from './contractBase';
import Fighter from '../../models/fighter.model';
import { seedNum } from '../../utils/fighterUtils';

class Account extends ContractBase {
  constructor(provider) {
    super(provider);
  }

  getFightersForAccount() {
    return this.contract.tokensOfOwner(this.accountAddress)
      .then(result => result.map(id => this.getInfoForFighter(id.toNumber())))
      .catch(error => console.log(error));
  }

  getInfoForFighter(fighterId) {
    return this.contract.getInfoForFighter(fighterId)
      .then(rawFighter => new Fighter(rawFighter, fighterId))
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
  }
}

export default Account;
