const calculateLevel = (fighter) => {
  return Math.floor((fighter.maxHealth.toNumber() + fighter.speed.toNumber() + fighter.strength.toNumber()) / 10);
}

const filterStringToQueryObject = (filterString, initialQuery = {}) => {
  // 'speed: 1, level: 3'
  return filterString
    .toLowerCase()
    .replace(/\s/g, '')
    .split(',')
    .reduce((queryObject, queryString) => {
      const queryArray = queryString.split(':')
      // Need to make sure that if we query by max level that it is in camelcase
      // if (queryArray[0].includes('max')) queryArray[0] = 'maxLevel'
      queryObject[queryArray[0]] = { $gte: queryArray[1] }
      return queryObject
    }, initialQuery)
}

const randomNumberMinToMax = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  calculateLevel,
  filterStringToQueryObject,
  randomNumberMinToMax
}
