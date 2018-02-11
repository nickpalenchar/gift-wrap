#!/usr/bin/env node
let {fork, exec} = require('child_process'),
  path = require('path'),
  statSync = require('fs').statSync,
  say = require('../../helper/say'),
  confirm = require('../../helper').confirm,
  chalk = require('chalk'),
  fs = require('fs');

let argvee = require('argvee')();
// INIT
// creates a dir in /usr/local named giftwrap for persisting options, if no dir exists
/** @flag -f overwrites the file permanently.
 */

say.info(chalk.yellow('Setting up'));
say.hint('This is usually a one time process--giftwrap need a place to save your cli\'s and some other options\n' +
  'The best place for this is in the /usr/local space. You can re-run this by running `giftwrap init`');

try {

  // CASE 0: -f is used. Remove any giftwrap and defer to case 3
  if (argvee.mode('f')) {
    exec('rm -rf /usr/local/giftwrap');
    throw 1; // yes I'm using a GOTO deal with it :)
  }

  if (statSync('/usr/local/giftwrap').isDirectory()) {
    // CASE 1: Directory already exists
    say.err("config directory already exists!");
    say.info("If you want to re initialize, run `giftwrap init -f`, this will delete the current config directory.");
  }
  else {
    // CASE 2: Something named giftwrap exists but is not a directory.
    say.err("File named `giftwrap already exists!");
    say.info("This might be coincidentally something else. You can rerun `giftwrap init -f` to remove it but we recommend you inspect it yourself");
    say("Would you like to open the directory and see what the file is? (remember, don't touch other files/directories you don't know about)");
    confirm()
      .then(res => res && exec('open /usr/local'))
  }
}
catch (e) {
  // CASE 3: Directory does not yet exist (create it!)
  let options = require('../../var/defaultOptions');
  say.info("creating directory in /usr/local");
  exec('mkdir /usr/local/giftwrap && chmod 777 /usr/local/giftwrap', (error, stdout, stderr) => {
    if (stderr && /Permission denied/.test(stderr)) {
      console.log(chalk.red("Unable to configure giftwrap!"));
      console.log(chalk.red("ERR: Please run `sudo giftwrap` so that we can add a file to /usr/local"));
      console.log("giftwrap will add the proper permissions so that sudo will not be required in the future");
      process.exit(1);
    }
    exec('mkdir /usr/local/giftwrap/clis && chmod 777 /usr/local/giftwrap/clis');
    say.ask('Would you like hints to be shown as you use giftwrap? (you can change this later by running `giftwrap options`');
    say.hint('Hint text looks like this and is recommended for beginners.');
    confirm()
      .then(res => {
        console.log("HEREE ,RES ", res);
        options.show_hints = res;
        let out = exec('touch /usr/local/giftwrap/options.json', (err, stdout, stderr) => {
        });

        fs.writeFileSync('/usr/local/giftwrap/options.json', JSON.stringify(options));
      })
      .then(() => {
        say("All set!");
        say.info("run `giftwrap` again to use!");
      })
  });
}