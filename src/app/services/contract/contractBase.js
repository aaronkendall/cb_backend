import contract from 'truffle-contract';
import Marketplace from '../../../build/contracts/Marketplace.json';
import { CONTRACT_ADDRESS } from '../../utils/constants';

class ContractBase {
  constructor(provider) {
    initialiseContract(provider);
  }

  initialiseContract(provider) {
    const FighterContract = contract({ abi: Marketplace }).at(CONTRACT_ADDRESS);
    this.contract = FighterContract.setProvider(provider);
  }
}

export default ContractBase;
