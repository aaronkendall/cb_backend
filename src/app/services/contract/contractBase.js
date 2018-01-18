import contract from 'truffle-contract';
import Marketplace from '../../../../build/contracts/Marketplace.json';
import { CONTRACT_ADDRESS } from '../../utils/constants';
import Fighter from '../../models/fighter.model';

class ContractBase {
  constructor(provider, defaultAccount) {
    this.accountAddress = defaultAccount;
    this.initialiseContract(provider);
  }

  initialiseContract(provider) {
    const fighterContract = contract({ abi: Marketplace.abi });
    fighterContract.setProvider(provider);
    fighterContract.defaults({ from: this.accountAddress, gasLimit: 999999 });

    this.contract = fighterContract.at(CONTRACT_ADDRESS);
  }

  getInfoForFighter(fighterId) {
    return this.contract.getInfoForFighter(fighterId)
      .then(rawFighter => new Fighter(rawFighter, fighterId))
      .catch(error => console.log('Error getting info for fighter', fighterId, error));
  }
}

export default ContractBase;
