import ethunits from 'ethereum-units';
import { toast } from 'react-toastify';

import ContractBase from './contractBase';
import Sale from '../../models/sale.model';

class Marketplace extends ContractBase {
  constructor(provider, defaultAccount) {
    super(provider, defaultAccount);
  }

  async getAllFightersInMarket() {
    try {
      const fighterIdsInMarket = await this.contract.getFightersForSale()
      return Promise.all(fighterIdsInMarket.map(async (id) => {
        const fighter = await this.getInfoForFighter(id)
        const fighterPrice = await this.getPriceForFighterInEth(id)

        return new Sale(fighter, fighterPrice)
      }))
    } catch(error) {
      console.log(error)
    }
  }

  getPriceForFighterInEth(id) {
    return this.contract.getPriceForFighter(id)
      .then(price => ethunits.convert(price.toNumber(), 'wei', 'ether').floatValue())
  }

  buyFighter(fighterId, price) {
    const weiPrice = ethunits.convert(price, 'ether', 'wei').floatValue()

    return this.contract.buyFighter(fighterId, { value: weiPrice })
      .then(result => {
        if (result.logs[0] && result.logs[0].args.fighterId.toNumber() === fighterId) {
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
