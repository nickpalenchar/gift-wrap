let {execSync} = require('child_process');
let {lstatSync, readFileSync, existsSync} = require('fs');
let path = require('path');

module.exports = function (argumentsArr) {

  let wd = execSync('pwd').toString('utf8').replace('\n', '');
  let files = execSync('ls').toString('utf8').split('\n').slice(0, -1).filter(file => {
    //console.log(path.join(wd, file));
    return lstatSync(path.join(wd, file)).isFile()
  });

  return argumentsArr.map(name => {

    // design choice. If it starts with a `~`, `/`, `.`, or `..`, it will only be considered as a file path.
    // if the file does not exist, it will error. EVEN if it expected a string that began with one of these
    // characters.

    // CASE 1: ABSOLUTE PATH
    // assume path exists, if not, throw error.
    if (/^[\/~]/.test(name)) {
      if (existsSync(name)) {
        return readFileSync(name, 'utf8').toString();
      }
      console.log("Error: Cannot find file");
      process.exit(1);
    }
    // CASE 2: POTENTIAL RELATIVE PATH
    if (/^\.{1,2}\.+/.test(name)) {
      console.log("><U>><U><U<></U>", name);
      // @TODO still need to check and make sure.
      let pathToFile = path.join(wd, name);

      if (existsSync(pathToFile)) {
        return readFileSync(pathToFile).toString();
      }
      console.log("Error: Cannot find file");
      process.exit(1);
    }
    // CASE 3: LOOKS LIKE STRING, IS A FILE IN CURRENT DIRECTORY
    let p = path.join(wd, name);

    if (existsSync(path.join(wd, name))) {
      return readFileSync(path.join(wd, name)).toString();
    }
    // CASE DEFAULT
    return name;

  });
};