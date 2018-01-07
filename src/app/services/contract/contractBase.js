import contract from 'truffle-contract';
import Marketplace from '../../../../build/contracts/Marketplace.json';
import { CONTRACT_ADDRESS } from '../../utils/constants';

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
}

export default ContractBase;
