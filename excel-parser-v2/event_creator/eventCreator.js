const _ = require('lodash');
const validator = require('../data_validator/dataValidator');
const excel = require('../excel_tools/excelTools');


function createEventsArray(name, usersWithDaysCollection) {
  userDaysArray = usersWithDaysCollection[name];
  userWorkDaysArray = [];
  for (let i = 0; i < userDaysArray.length; i++) {
    let workHours = parseInt(userDaysArray[i]);
    if (!_.isNaN(workHours)) {
      userWorkDaysArray.push(createEventCollection(name, usersWithDaysCollection, i));
    }
  }
  return userWorkDaysArray
}

function createEventCollection(name, usersWithDaysCollection, index) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let daysInTable = usersWithDaysCollection[name].length;
  let day = index + 1;

  let endYear = validator.checkYear(year, daysInTable, month, day + 1);
  let endMonth = validator.checkMonth(daysInTable, month, day + 1);
  let endDay = validator.checkDay(daysInTable, day + 1);

  let workWith = excel.getWorkerNameByDate(name, userDaysCollection, index);

  const event = {
    title: `Working with ${workWith}`,
    start: [year, month, day],
    end: [endYear, endMonth, endDay],
    description: `Arvutitark`
  }
  return event
}

module.exports.createEventsArray = createEventsArray
