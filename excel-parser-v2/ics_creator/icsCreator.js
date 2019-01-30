const ics = require('ics');
const { writeFileSync } = require('fs');
const inputTools = require('../input_tools/inputTools');

function createICSFile(events, userName) {
  const { error, value } = ics.createEvents(events);
  writeFileSync(`./ics_generated_file/events_${inputTools.replaceSpaceOnUnderscore(userName)}.ics`, value);
}

module.exports.createICSFile = createICSFile
