import contract from 'truffle-contract';
import CryptoBrawlers from '../../../../build/contracts/CryptoBrawlers.json';
import { CONTRACT_ADDRESS, DEFAULT_CALL_GAS } from '../../utils/constants';
import Fighter from '../../models/fighter.model';

class ContractBase {
  constructor(provider, defaultAccount) {
    this.accountAddress = defaultAccount;
    this.initialiseContract(provider);
  }

  initialiseContract(provider) {
    const fighterContract = contract({ abi: CryptoBrawlers.abi });
    fighterContract.setProvider(provider);
    fighterContract.defaults({ from: this.accountAddress, gasLimit: 999999 });

    this.contract = fighterContract.at(CONTRACT_ADDRESS);
  }

  getInfoForFighter(fighterId) {
    return this.contract.getInfoForFighter.call(fighterId, { gas: DEFAULT_CALL_GAS })
      .then(rawFighter => new Fighter(rawFighter, fighterId))
      .catch(error => console.log('Error getting info for fighter', fighterId, error));
  }
}

export default ContractBase;
