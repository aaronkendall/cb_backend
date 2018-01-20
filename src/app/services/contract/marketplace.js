import ethunits from 'ethereum-units';
import toast from 'react-toastify';

import ContractBase from './contractBase';
import Sale from '../../models/sale.model';

class Marketplace extends ContractBase {
  constructor() {
    super();
  }

  getAllFightersInMarket() {
    return this.contract.getFightersForSale()
      .then(result => result.map(id => {
        const fighterId = id.toNumber();
        return Promise.all([this.getInfoForFighter(fighterId), this.getPriceForFighter(fighterId)])
          .then(fighterInfo => new Sale(fighterInfo[0], fighterInfo[1]));
      }))
      .catch(error => console.log('Error getting fighters for sale', error))
  }

  getPriceForFighterInEth(id) {
    return this.contract.getPriceForFighter(id)
      .then(price => ethunits.convert(price.toNumber(), 'wei', 'ether').toNumber())
  }

  buyFighter(fighterId, price) {
    const weiPrice = ethunits.convert(price, 'ether', 'wei').toNumber()

    return this.contract.buyFighter(fighterId, { value: weiPrice })
      .then(result => {
        if (result.logs[0] && result.logs[0].args.fighterId === fighterId) {
          toast.success(`Successfully purchsed Fighter #${fighterId}`)
          return true
        }
        toast.error(`Could not complete purchase of Fighter #${fighterId}`)
        return false
      })
      .catch(error => console.log('Error purchasing fighter ', fighterId, error))
  }
}

export default Marketplace;
