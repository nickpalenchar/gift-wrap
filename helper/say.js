/** SAY
 use this instead of console.log when you want to
 actually say things to the user.
 @method say (logs)
 @method hint (gives hint and checks option to see if it should surpress or not.
 */
let chalk = require('chalk');
let options = require('../helper/getOptions');

let say = (...args) => console.log(...args);
say.ask = (...args) => console.log(chalk.blue(...args));

say.log = (...args) => console.log(...args);
say.info = (...args) => console.log(chalk.yellow(...args));
say.err = (...args) => console.log(chalk.red(...args));

say.hint = (...args) => {
  if (options.show_hints) {
    console.log(chalk.grey(...args));
  }
};

module.exports = say;