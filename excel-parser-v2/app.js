const userName = require('./input_tools/inputTools');
const excel = require('./excel_tools/excelTools');
const event = require('./event_creator/eventCreator');
const icsCreator = require('./ics_creator/icsCreator');


function main() {
  const name = userName.getName();
  const usersWithDaysCollection = excel.getCollectionWithUsers();
  const userEventsArray = event.createEventsArray(name, usersWithDaysCollection);
  icsCreator.createICSFile(userEventsArray);
}

main();
