const ics = require('ics');
const { writeFileSync } = require('fs');


function createICSFile(events) {
  const { error, value } = ics.createEvents(events);
  writeFileSync(`./ics_generated_file/events.ics`, value);
}

module.exports.createICSFile = createICSFile
