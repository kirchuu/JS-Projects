const XLSX = require('xlsx');
const readline = require('readline-sync');
const _ = require('lodash');


const workbook = XLSX.readFile('./excel-table/table.xlsx');
const first_sheet_name = workbook.SheetNames[0];
const worksheet = workbook.Sheets[first_sheet_name];


function main() {
  let name = askName();
  if (checkName(name, worksheet)) {
    parseObjToArr(name, worksheet);
  }
}


function askName() {
  while (true) {
    let inputName = readline.question("What's your full name? ").trim();
    let isSpaced = inputName.search(' ') != -1;

    if (isSpaced) {
      inputName = _.lowerCase(inputName);
      return _.startCase(inputName)
    } else console.log('Between name and surename should be a space');
  }
}


function checkName(name, worksheet) {
  for (object in worksheet) {
    if (name === worksheet[object].v) {
      return true
    }
  }
}

function parseObjToArr(name, worksheet) {
  for (object in worksheet) {
    let someObj = worksheet[object];
    console.log(someObj[Object.keys(someObj)[1]]);
  }
}

main();
