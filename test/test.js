let { exec, execSync } = require('child_process');
let { lstatSync, readFileSync } = require('fs');
let path = require('path');


let fnArgs = ['notAfile', '../gift-wrap/README.md', 'HELLOOO'];

let wd = execSync('pwd').toString('utf8').replace('\n','');
let files = execSync('ls').toString('utf8').split('\n').slice(0,-1).filter(file => {
    //console.log(path.join(wd, file));
    return lstatSync(path.join(wd,file)).isFile()
});

fnArgs = fnArgs.map(name => {
    // CASE 1: ABSOLUTE PATH
    // assume path exists, if not, throw error.
    if(/^[\/~]/.test(name)) {
        console.log('ABSOLUTE');
        return readFileSync(name, 'utf8');
    }
    // CASE 2: POTENTIAL RELATIVE PATH
    if(files.includes(name) || /^\.{1,2}\.+/.test(name)){
        // @TODO still need to check and make sure.
    }

});

console.log('>>> ', fnArgs);