let chalk = require('chalk');
let exec = require('child_process').execSync;
let shelljs = require('shelljs');
let fs = require('fs');

module.exports = function functionUnpacker(filePath){
  let fn;
  try{
    fn = require(filePath);
  }catch(e){
    console.log(chalk.red("PARSE ERROR: Could not parse source file correctly"));
    console.log(chalk.gray("please refer to URL for acceptable ways to write a function with this CLI. Original error below, which may provide " +
      "more information")); //todo: acceptable function filse
    console.log(e);
    process.exit(1);
  }
  let entryFn;

  if(typeof fn === 'function'){
    // Case 1: require imports a function. Return the function.
    console.log(chalk.cyan('Found function ') + chalk.yellow(fn.name || "<anonymous function>"));
    entryFn = fn;
  }
  else if(typeof fn === 'object' && Object.keys(fn).length){
    // Case 2: exported as an object. If only export, use. If multiple exports, prompt for right one.
    if(Object.keys(fn).length > 1){
      console.log("More than one function exported");
      //PROMPT for correct function. (FILTER non-functions)
    }
    else {
      // there is only one function located at the 0th index.
      entryFn = fn[Object.keys(fn)[0]];
      console.log(chalk.cyan('Found function ') + chalk.yellow(fn.name || Object.keys(fn)[0] + " (Object property)"));
    }
  }
  else {
    // case 3: vanilla javascript file. Concat into node module and then recursively call to require in.
    let template = "module.exports = " + shelljs.cat(filePath).stdout;
    exec('rm -rf ._temp && mkdir ._temp');
    let wd = shelljs.pwd().stdout;
    fs.writeFileSync(`${wd}/._temp/fn.js`, template);

    entryFn = functionUnpacker(`${wd}/._temp/fn.js`);

    exec('rm -rf ._temp');

  }

  // error checking.
  if(typeof entryFn !== 'function'){
    throw new TypeError("needs to be function"); //TODO ELABORATE
  }
  
  return entryFn;
};
