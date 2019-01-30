const inputTools = require('./input_tools/inputTools');
const excel = require('./excel_tools/excelTools');
const event = require('./event_creator/eventCreator');
const icsCreator = require('./ics_creator/icsCreator');


function main() {
  const workPlace = inputTools.getWorkPlace();
  const representation = inputTools.getWorkRepresentation(workPlace);
  const userName = inputTools.getName(representation);
  const usersWithDaysCollection = excel.getCollectionWithUsers(representation);
  const userEventsArray = event.createEventsArray(userName, usersWithDaysCollection);
  icsCreator.createICSFile(userEventsArray, userName);
}

main();
