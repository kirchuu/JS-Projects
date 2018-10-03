const XLSX = require('xlsx');
const { writeFileSync } = require('fs');
const readline = require('readline-sync');
const _ = require('lodash');
const ics = require('ics');


const workbook = XLSX.readFile('./excel-table/table.xlsx');
const first_sheet_name = workbook.SheetNames[0];
const worksheet = workbook.Sheets[first_sheet_name];


function main() {
  let name = askName();
  if (checkName(name, worksheet)) {
    let datesAndNames = parseObjToArr(worksheet);
    let workerIndexes = getIndex(datesAndNames);

    let workersDays = []
    workersDays.push(cutArray(datesAndNames, workerIndexes[0]));
    workersDays.push(cutArray(datesAndNames, workerIndexes[1]));
    workersDays.push(cutArray(datesAndNames, workerIndexes[2]));
    workersDays.push(checkLength(cutArray(datesAndNames, workerIndexes[3]), workersDays[0]));

    let userDays = getUserArray(name, workersDays);

    let events = [];
    createEvent(userDays, events, workersDays);
    writeToCal(events);
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
  let valueLength = 3;

  for (let i = workerIndex; i < datesAndNames.length; i++) {
    let element = datesAndNames[i];
    if (element !== datesAndNames[workerIndex] && element.length > valueLength) {
      break
    } else {
      dates.push(element);
    }
  }
  return _.drop(dates);
}


function checkLength(days, workerOne) {
  if (days.length !== workerOne.length) {
    return _.dropRight(days)
  } else return days
}


function getUserArray(name, workersDays) {
  if (name === worksheet['A1'].v) {
    return workersDays[0]
  } else if (name === worksheet['A2'].v) {
    return workersDays[1]
  } else if (name === worksheet['A3'].v) {
    return workersDays[2]
  } else return workersDays[3]
}


function createEvent(userDays, events, workersDays) {
  for (let i = 0; i < userDays.length; i++) {
    let workHours = parseInt(userDays[i]);

    if (!_.isNaN(workHours)) {
      let day = i + 1;
      events.push(createSchema(userDays, day, workersDays));
    }
  }
}


function createSchema(userDays, day, workersDays) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let monthDays = userDays.length;

  let endYear = checkYear(year, monthDays, month, day + 1);
  let endMonth = checkMonth(monthDays, month, day + 1);
  let endDay = checkDay(monthDays, day + 1);

  let workWith = compareDays(day, userDays, workersDays);

  const event = {
    start: [year, month, day],
    end: [endYear, endMonth, endDay],
    title: `Work with ${workWith}`,
    description: `Arvutitark`
  }
  return event
}


function checkMonth(monthDays, month, day) {
  if (month === 12 && day > monthDays) {
    return 1
  } else if (day > monthDays) {
    return month+1
  } else return month
}


function checkDay(monthDays, day) {
  if (day > monthDays) {
    return 1
  } else return day
}


function checkYear(year, monthDays, month, day) {
  if (month === 12 && day > monthDays) {
    return year+1
  } else return year
}


function compareDays(day, userDays, workersDays) {
  for (worker in workersDays) {
    if (userDays.toString() !== workersDays[worker].toString()) {
      let workHours = parseInt(workersDays[worker][day]);
      if (!_.isNaN(workersDays[worker][day])) {
        let index = worker + 1;
        console.log(index, `A${index}`);
        return worksheet[`A${index}`].v
      }
    }
  }
}


function writeToCal(events) {
  ics.createEvents(events, (error, value) => {
    if (error) {
      console.log(error)
    }
  console.log(events);
  writeFileSync(`./ics/event.ics`, events)
  });
}


main();
