let shelljs = require('shelljs');
let path = require('path');
let exec = require('child_process').execSync;


module.exports = function builder2(sourceFn, cliName){
  /** bootstraps the function to be used as cli. Grabs CLI arguments or text files and passes to the source function.
   * @param sourceFn {string} - ITS A STRING of the function. Weird I know but we're writing it to a js file.
   * @param cliName {string} - Name to be used for the cli
   */

};

module.exports = function builder(entryFn, cliName){

  exec("rm -rf __output && mkdir __output");
  let outpath = path.join(shelljs.pwd(), '__output');//TODO GET OUTPATH

  let outfile = '';

  // add arg parcing. refernced as array `args`
  outfile += shelljs.cat(path.join(__dirname, '/fragments/preFunc.js')).stdout;

  //if the function is anonymous, need to assign it to a variable, which will be the reference to invoke
  let entryFnName = entryFn.name || "genericFn";
  
  outfile +=
```
var ${entryFnName} = ${entryFn.toString()};
${entryFnName}(...args);
var fnRef = ${entryFnName}
```;
  
  // write file to the output. Just be a man and use fs module.
  
};