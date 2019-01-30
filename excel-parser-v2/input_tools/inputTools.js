const readline = require('readline-sync');
const _ = require('lodash');
const excel = require('../excel_tools/excelTools');
const workPlaces = require('../work_places/workPlaces');


function getWorkPlace() {
  while (true) {
    let input = readline.question("Where are you working? ").trim();
    input = formatInput(input)
    if (validateWorkPlace(input)) {
      return input
    } else {
      console.log('No such work place! Check name correctness.');
    }
  }
}

function getWorkRepresentation(workPlace) {
    if (workPlace === 'Arvutitark') {
      while (true) {
        let input = readline.question("What representation are you working in? ").trim();
        input = formatInput(input)
        if (validateRepresentation(input)) {
          return input
        } else {
          console.log('No such representation! Check name correctness.');
        }
      }
    } else {
      return null
    }
}

function getName(representation) {
  while (true) {
    let input = readline.question("What's your full name? ").trim();
    let isSpaced = input.search(' ') != -1;

    if (isSpaced) {
      input = formatInput(input)
      if (validateName(input, representation)) {
        return input
      } else {
        console.log('No such name in excel table! Check name correctness.');
      }
    } else console.log('Between name and surename should be a whitespace.');
  }
}

function validateName(input, representation) {
    const namesArray = excel.getNames(representation);
    return namesArray.includes(input)
}

function validateWorkPlace(place) {
  const workPlacesArray = workPlaces.getWorkPlaces();
  return workPlacesArray.includes(place)
}

function validateRepresentation(representation) {
  const representationArray = workPlaces.getWorkRepresentation();
  return representationArray.includes(representation)
}

function formatInput(input) {
  input = _.lowerCase(input);
  input = replaceEstonianLetters(input);
  input = _.startCase(input);
  input = input.replace('At', 'Arvutitark');
  input = input.replace('Krissu', 'Kristiine');
  return input
}

function replaceEstonianLetters(input) {
  input = input.replace(/õ/gi, 'o').replace(/ä/gi, 'a').replace(/ö/gi, 'o').replace(/ü/gi, 'u');
  return input
}

function replaceSpaceOnUnderscore(userName) {
  userName = userName.replace(' ', '_')
  return userName
}


module.exports = {
  getName,
  getWorkPlace,
  getWorkRepresentation,
  replaceSpaceOnUnderscore
}
