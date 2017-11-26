let chalk = require('chalk');
let prompt = require('cli-prompt');

module.exports.confirm = function confirm (promptText="y/n? ") {
  return new Promise((resolve) => {
    prompt(promptText, data=> {
      if(/^ye?s?\s*$/i.test(data)){
        return resolve(true);
      }
      if(/^no?\s*$/i.test(data)) {
        return resolve(false);
      }
      console.log(chalk.red("Invalid response, please enter `y` or `n` (without quotes)"));
      return confirm()
    })
  })
};

//
// return new Promise((resolve,reject)=> {
//   console.log(chalk.blue("Multiple JS files detected. Select the file you want by number:"));
//   let fileList = jsFiles.map((file, i) => `${i+1}) ${file}`).join('\n');
//   console.log(chalk.cyan(fileList));
//   prompt("> ", data => {
//     data = parseInt(data);
//
//     if(Number.isNaN(data)) {
//       console.log(chalk.red("Invalid response. Please enter only a number."));
//       return multipleFilePrompt(jsFiles);
//     }
//     console.log("FILELIST LENGTH?? ", typeof fileList);
//     if(data < 1 || data > jsFiles.length) {
//       console.log(chalk.red("Invalid response. Please enter a number between 1 and " + jsFiles.length));
//       return multipleFilePrompt(jsFiles);
//     }
//     return resolve(jsFiles[data-1]);
//   });
// });