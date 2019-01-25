const readline = require('readline-sync');
const _ = require('lodash');
const excel = require('../excel_tools/excelTools');


function getName() {
  while (true) {
    let inputName = readline.question("What's your full name? ").trim();
    let isSpaced = inputName.search(' ') != -1;

    if (isSpaced) {
      inputName = _.lowerCase(inputName);
      name = _.startCase(inputName);
      return validateName(name)
    } else console.log('Between name and surename should be a whitespace.');
  }
}

function validateName(name) {
    const names_arr = excel.getNames();
    if (names_arr.includes(name)) {
      return name
    } else {
      console.log('No such name in excel table! Check name correctness.');
      return getName();
    }
}


module.exports.getName = getName
