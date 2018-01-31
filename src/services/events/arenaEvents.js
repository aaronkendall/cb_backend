const arenaEvents = (contract) => {
  contract.FightComplete((error, tx) => {
    if (error) return console.log('Error with FightComplete ', error);

    // do something with the args
    tx.args
  })

  contract.ArenaRemoval((error, tx) => {
    if (error) return console.log('Error with ArenaRemoval ', error);

    tx.args
  })

  contract.ArenaAdd((error, tx) => {
    if (error) return console.log('Error with ArenaAdd ', error);
  })
}

module.exports.default = arenaEvents
