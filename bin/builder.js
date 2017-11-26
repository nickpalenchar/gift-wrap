let shelljs = require('shelljs');
let path = require('path');
let exec = require('child_process').execSync;
let writeFileSync = require('fs').writeFileSync;

module.exports = function builder2(sourceFn, cliName){
  /** bootstraps the function to be used as cli. Grabs CLI arguments or text files and passes to the source function.
   * @param sourceFn {string} - ITS A STRING of the function. Weird I know but we're writing it to a js file.
   * @param cliName {string} - Name to be used for the cli
   */

};

module.exports = function builder(entryFn, cliName){
  cliName = cliName || 'my-cli';

  let outputDir = `${cliName}_output`;
  exec(`rm -rf ${outputDir} && mkdir ${outputDir}`);
  let outpath = path.join(shelljs.pwd().stdout, outputDir);

  let outfile = '';

  // add arg parcing. refernced as array `args`
  outfile += shelljs.cat(path.join(__dirname, '/fragments/preFunc.js')).stdout;
  let outpackage = buildPackageJson(path.join(__dirname, '/fragments/package.json'), cliName);

  //if the function is anonymous, need to assign it to a variable, which will be the reference to invoke
  let entryFnName = entryFn.name || "genericFn";
  outfile += "var " + entryFnName + " = "+entryFn.toString()+";\nvar fnRef = " + entryFnName;
  // add function wrapping and invokation.
  outfile += shelljs.cat(path.join(__dirname, '/fragments/postFunc.js')).stdout;

  // write file to the output. Just be a man and use fs module. //todo: WRITE IS AS FS ECHO IS TOO TRICKYY!!-

  //outfile = outfile.replace(/"/g,"\\\"").replace(/\\/g,"\\\\");

  writeFileSync(`${outputDir}/output.js`, outfile);
  writeFileSync(`${outputDir}/package.json`, outpackage);
  exec(`open .`);
};

function buildPackageJson(pathToTemplate, name='my-cli'){
  /** @param pathToTemplate {string} - where the package.json template is located.
   *  @param name - will replace all instances of %NAME% with the name.
   */
  pathToTemplate = path.join(pathToTemplate);
  let result = shelljs.cat(pathToTemplate).stdout.replace(/%NAME%/g, name);
  console.log("result ", result);
  return result;
}