import { DEVELOPMENT_BLOCKCHAIN_URI } from './constants';
import { initApp } from '../actions/coreActions';

export default function initialiseWeb3(dispatch) {
  if (typeof window.web3 !== 'undefined') {
    const ethProvider = web3.currentProvider
    
    web3.eth.getAccounts()
      .then(accounts => {
        if (accounts.length > 0) {
          // This needs to be added to state here as it doesn't persist otherwise and
          // we get some weird errors occasionally with the address being undefined
          dispatch(initApp(accounts[0], ethProvider))
        }
      })
  }
}
