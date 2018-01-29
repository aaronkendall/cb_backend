import ethunits from 'ethereum-units'
import { toast } from 'react-toastify'
import axios from 'axios'

import ContractBase from './contractBase'
import Sale from '../../models/sale.model'
import { DEFAULT_CALL_GAS, MARKETPLACE_ENDPOINT } from '../../utils/constants'

class Marketplace extends ContractBase {
  constructor(provider, defaultAccount) {
    super(provider, defaultAccount);
  }

  async getAllFightersInMarket(query, offset) {
    try {
      return await axios.get(`${MARKETPLACE_ENDPOINT}/all/${offset}`)
    } catch(error) {
      console.log(error)
    }
  }

  async getFilteredFightersInMarket(query, offset) {
    try {
      const { filterKey, filterValue, sortBy, sortDirection } = query
      return await axios.get(
        `${MARKETPLACE_ENDPOINT}/all/${offset}/filter/${filterKey || 'level'}/value/${filterValue || '1'}/sortBy/${sortBy || 'createdAt'}/direction/${sortDirection || 'asc'}`
      )
    } catch(error) {
      console.log(error)
    }
  }

  getPriceForFighterInEth(id) {
    return this.contract.getPriceForFighter.call(id, { gas: DEFAULT_CALL_GAS })
      .then(price => ethunits.convert(price.toNumber(), 'wei', 'ether').floatValue())
  }

  buyFighter(fighterId, price) {
    const weiPrice = ethunits.convert(price, 'ether', 'wei').floatValue()

    return this.contract.buyFighter(fighterId, { value: weiPrice })
      .then(result => {
        if (result.logs[0] && result.logs[0].args.fighterId.toNumber() === fighterId) {
          toast.success(`Successfully purchsed Fighter #${fighterId}`)
          axios.delete(`${MARKETPLACE_ENDPOINT}/remove/${fighterId}`)
            .then(() => {
              return true
            })
        }
        toast.error(`Could not complete purchase of Fighter #${fighterId}`)
        return false
      })
      .catch(error => console.log('Error purchasing fighter ', fighterId, error))
  }
}

export default Marketplace;
