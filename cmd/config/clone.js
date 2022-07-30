const fs = require('fs-extra');
const color = require('../../Core/Console/colorcode')

module.exports = (args) => {
    if (!args[2] || !args[3]) 
        return console.log(color.code.blue, `[Config | Clone] Usage: config clone <filename> <clonefilename>`);
    if (!fs.existsSync(`./config/${args[2]}.json`)) 
        return console.log(color.code.red, `[Config | Clone | Error] Config [${args[2]}] does not exist.`);
    if (fs.existsSync(`./config/${args[3]}.json`)) 
        return console.log(color.code.red, `[Config | Clone | Error] Config [${args[3]}] already exists.`);
    fs.copySync(`./config/${args[2]}.json`, `./config/${args[3]}.json`);
    return console.log(color.code.green, `[Config | Clone | Done] Config [${args[2]}] cloned to [${args[3]}]`);
};