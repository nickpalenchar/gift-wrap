let { fork, exec } = require('child_process'),
  shelljs = require('shelljs'),
  path = require('path'),
  say = require('../../helper/say'),
  chalk = require('chalk');

// RUN
// runs a stored cli, passing subsequent arguments to the cli.

let availableClis = shelljs.ls('/usr/local/giftwrap/clis').stdout.split('\n').slice(0,-1);
let cliToRun = process.argv[2];

if(availableClis.includes(cliToRun)){
  // RUN THE CLI
  fork(path.join(`/usr/local/giftwrap/clis/${cliToRun}/output.js`), process.argv.slice(3));
}
else {
  say.err("No CLI of that name found.");
  say.hint("Make sure you spelled it correctly, including proper capitalization");
  say.hint(chalk.underline("\nCurrently available clis are: "));

  availableClis.forEach(cliName => say.hint(chalk.yellow(cliName)));

  say.hint("\nRun `giftwrap ls` to see the available clis you can run");
}

//if(availableClis)