import ContractBase from './contractBase';
import ethunits from 'ethereum-units';
import toast from 'react-toastify';

class Marketplace extends ContractBase {
  constructor() {
    super();
  }

  getAllFightersInMarket() {
    return this.contract.getFightersForSale()
      .then(fighters => fighters)
      .catch(error => console.log('Error getting fighters for sale', error))
  }

  buyFighter(fighterId, price) {
    const weiPrice = ethunits.convert(price, 'ether', 'wei').toNumber()
    return this.contract.buyFighter(fighterId, { value: weiPrice })
      .then(result => {
        if (result.logs[0] && result.logs[0].args.fighterId === fighterId) {
          toast.success(`Successfully purchsed Fighter #${fighterId}`)
          return true
        }
        toast.error(`Could not completed purchase of Fighter #${fighterId}`)
        return false
      })
      .catch(error => console.log('Error purchasing fighter ', fighterId, error))
  }
}

export default Marketplace;
