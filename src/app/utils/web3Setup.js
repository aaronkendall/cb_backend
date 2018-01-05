import { DEVELOPMENT_BLOCKCHAIN_URI } from './constants';
import { setProvider, signInOrOut } from '../actions/coreActions';


export default function initialiseWeb3(dispatch) {
  if (typeof window.web3 !== 'undefined') {
    const ethProvider = web3.currentProvider;
    dispatch(setProvider(ethProvider));
    dispatch(signInOrOut(true));
  }
}
