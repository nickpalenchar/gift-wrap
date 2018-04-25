let { exec, execSync } = require('child_process');
let { lstatSync } = require('fs');
let path = require('path');

exec('ls', (error, stout) => {
    if (error) throw error;

    // console.log(stout.split('\n').slice(0,-1));



});


let wd = execSync('pwd').toString('utf8').replace('\n','');


let files = execSync('ls').toString('utf8').split('\n').slice(0,-1).filter(file => {
    //console.log(path.join(wd, file));
    return lstatSync(path.join(wd,file)).isFile()
});

console.log('>>> ', files);