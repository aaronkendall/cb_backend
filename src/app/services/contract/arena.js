import toast from 'react-toastify';

import ContractBase from './contractBase';
import { seedNum } from '../../utils/fighterUtils';
import { DEFAULT_FIGHT_GAS, DEFAULT_CALL_GAS } from '../../utils/constants';

class Arena extends ContractBase {
  constructor(provider, defaultAccount) {
    super(provider, defaultAccount);
  }

  getAllFightersInArena() {
    return this.contract.getFightersInArena.call({ gas: DEFAULT_CALL_GAS })
      .then(results => results.map(id => this.getInfoForFighter(id.toNumber())))
      .catch(error => console.log('Error getting fighters in arena', error))
  }

  brawlWithFighter(attackerId, defenderId) {
    return this.contract.fight(attackerId, defenderId, seedNum(), { gasLimit: DEFAULT_FIGHT_GAS })
      .then(result => {
        if (!result.logs.length) toast.error('Could not complete fight, you possibly did not use enough gas!')
        const userHasWon = result.logs[1].args.winnerId === attackerId
        // log for the FightComplete event
        userHasWon ? toast.success(`Congratulations! You won Fighter #${defenderId}`) :
          toast.warn(`Oh no! Fighter #${attackerId} was defeated and you lost it!`)

        return userHasWon
      })
      .catch(error => console.log('Error with fighter between ', attackerId, defenderId))
  }
}

export default Arena;
