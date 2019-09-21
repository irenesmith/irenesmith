const NUM_SIDES = 6;
var picPath = '';

// Initialize the dice
function initDice(numDice) {
  // ------------------------------------
  // dice is an array of five objects.
  // Each object has three fields:
  //   id -    a number from 0 to 4
  //   keep -  a boolean value which,
  //           if true, means the user
  //           doesn't want to roll this
  //           die again.
  //   value - The value from 1 to 6
  // ------------------------------------
  for (let i = 0; i < numDice; i++) {
    dice[i] = { id: i, keep: false, value: i + 1 };
  }
  return dice;
}

function rollDice(path, numDice, dice) {
  // roll the dice but only those not marked to keep
  for (let i = 0; i < NUM_DICE; i++) {
    if (!dice[i].keep) {
      let dieVal = Math.floor(Math.random() * NUM_SIDES + 1);
      dice[i].value = dieVal;
      dice[i].keep = false;
      document.getElementById(dice[i].id).setAttribute('src', 'img/' + dieVal + '.png');
    }
  }
}