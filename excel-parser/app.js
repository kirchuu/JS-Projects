const XLSX = require('xlsx');
const readline = require('readline-sync');
const _ = require('lodash');


const workbook = XLSX.readFile('./excel-table/table.xlsx');
const first_sheet_name = workbook.SheetNames[0];
const worksheet = workbook.Sheets[first_sheet_name];


function main() {
  let name = askName();
  if (checkName(name, worksheet)) {
    let datesAndNames = parseObjToArr(worksheet);
    let workerIndexes = getIndex(datesAndNames);

    let workerOne = cutArray(datesAndNames, workerIndexes[0]);
    let workerTwo = cutArray(datesAndNames, workerIndexes[1]);
    let workerThree = cutArray(datesAndNames, workerIndexes[2]);
    let workerFour = cutArray(datesAndNames, workerIndexes[3]);
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


function parseObjToArr(worksheet) {
  let datesAndNames = [];

  for (value in worksheet) {
    valueObj = worksheet[value];
    datesAndNames.push(valueObj[Object.keys(valueObj)[1]]);
  }
  return datesAndNames;
}


function getIndex(datesAndNames) {
  let workerIndexes = [];
  workerIndexes.push(_.indexOf(datesAndNames, worksheet['A1'].v));
  workerIndexes.push(_.indexOf(datesAndNames, worksheet['A2'].v));
  workerIndexes.push(_.indexOf(datesAndNames, worksheet['A3'].v));
  workerIndexes.push(_.indexOf(datesAndNames, worksheet['A4'].v));
  return workerIndexes
}


function cutArray(datesAndNames, workerIndex) {
  let dates = [];

  for (let i = 0; i < datesAndNames.length; i++) {
    if (datesAndNames[i] === workerIndex) {
      
    }
  }
  // let length = secondWorkerInArr;
  //
  // if (secondWorkerInArr === undefined) {
  //   length = datesAndNames.length
  // } else {
  //   for (i = firstWorkerInArr; i < length; i++) {
  //     dates.push(datesAndNames[i]);
  //   }
  // }
  // dates.shift();
  // datesAndNames.splice(firstWorkerInArr, length);

  return dates;
}
main();
