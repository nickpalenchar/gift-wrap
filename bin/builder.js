let shelljs = require('shelljs');
let path = require('path')


export function builder(entryFn, cliName){
  let outpath = ''//TODO GET OUTPATH

  let outfile = '';

  // add arg parcing. refernced as array `args`
  outfile += shelljs.cat(path.join(__dirname, 'fragments/prepareArgs.js')).stdout;

  //if the function is anonymous, need to assign it to a variable, which will be the reference to invoke
  let entryFnName = entryFn.name || "genericFn";
  
  outfile +=
```
var ${entryFnName} = ${entryFn.toString()};
${entryFnName}(...args);
```
  
  // write file to the output. Just be a man and use fs module.
  
}
