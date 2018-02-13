const calculateLevel = (fighter) => {
  return Math.floor((fighter.maxHealth.toNumber() + fighter.speed.toNumber() + fighter.strength.toNumber()) / 10);
}

const filterStringToQueryObject = (filterString) => {
  // 'speed: 1, level: 3'
  return filterString
    .replace(/\s/g, '')
    .split(',')
    .reduce((queryObject, queryString) => {
      const queryArray = queryString.split(':')
      // Need to make sure that if we query by max level that it is in camelcase
      if (queryArray[0].toLowerCase().includes('max')) queryArray[0] = 'maxLevel'

      queryObject[`fighter.${queryArray[0]}`] = { $gte: queryArray[1] }
      return queryObject
    }, {})
}

module.exports = {
  calculateLevel,
  filterStringToQueryObject
}
