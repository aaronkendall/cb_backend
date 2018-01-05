import contract from 'truffle-contract';
import Marketplace from '../../../../build/contracts/Marketplace.json';
import { CONTRACT_ADDRESS } from '../../utils/constants';

class ContractBase {
  constructor(provider) {
    this.initialiseContract(provider);
  }

  initialiseContract(provider) {
    this.accountAddress = provider.publicConfigStore._state.selectedAddress;

    const fighterContract = contract({ abi: Marketplace.abi });
    fighterContract.setProvider(provider);
    fighterContract.defaults({ from: this.accountAddress, gasLimit: 999999 });

    this.contract = fighterContract.at(CONTRACT_ADDRESS);
  }
}

export default ContractBase;
