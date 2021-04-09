const fs = require('fs');

if (process.argv.length !== 3) {
    throw new Error("version is missing")
}

const version = process.argv[2]
const fileName = './package.json';
const file = require(fileName);
file.version = version

fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing version ' + version + ' to ' + fileName);
});