const XLSX = require('xlsx');
const readline = require('readline-sync');


let workbook = XLSX.readFile('excel.xlsx');
let first_sheet_name = workbook.SheetNames[0];
let worksheet = workbook.Sheets[first_sheet_name];

let name = readline.question("What's your full name?");

if (checkName(name, worksheet)) {
  main(name, worksheet);
}

function main(name, worksheet) {

}


function checkName(name, worksheet) {
  for (nameInTable in worksheet) {
    console.log(name === nameInTable)
  }
}
