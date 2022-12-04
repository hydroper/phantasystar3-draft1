const path = require('path');
const {exec} = require('node:child_process');

function runInParallel(cmd) {
    let childProcess = exec(cmd);
    childProcess.stdout.on('data', data => {
        console.log(data.toString());
    });

    childProcess.stderr.on('data', data => {
        console.error(data.toString());
    });

    /*
    childProcess.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
    */
}

runInParallel('npm run debug-js-watch');
runInParallel('npm run debug-css-watch');
runInParallel('npm run debug-serve');