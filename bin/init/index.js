#!/usr/bin/env node
let { fork, exec } = require('child_process'),
  path = require('path'),
  statSync = require('fs').statSync,
  say = require('../../helper/say'),
  confirm = require('../../helper').confirm,
  chalk = require('chalk'),
  fs = require('fs');

// INIT
// creates a dir in /usr/local named giftwrap for persisting options, if no dir exists
/** @flag -f overwrites the file permanently.
*/

say.info(chalk.yellow('Setting up'));
say.hint('This is usually a one time process--giftwrap need a place to save your cli\'s and some other options\n' +
  'The best place for this is in the /usr/local space. You can re-run this by running `giftwrap init`');

try {
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
  exec('mkdir /usr/local/giftwrap');
  say.ask('Would you like hints to be shown as you use giftwrap? (you can change this later by running `giftwrap options`');
  say.hint('Hint text looks like this and is recommended for beginners.');
  confirm()
    .then(res => {
      options.show_hints = res;
      let out = exec('touch /usr/local/giftwrap/options.json').stdout;
      console.log(out);
      fs.writeFileSync('/usr/local/giftwrap/options.json', JSON.stringify(options));
    })
    .then(() => {
      say("All set!");
      say.info("run `giftwrap` again to use!");
    })
}