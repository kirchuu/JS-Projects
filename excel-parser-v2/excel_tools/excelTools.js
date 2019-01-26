const _ = require('lodash');
const XLSX = require('xlsx');


function getCollectionWithUsers(representation) {
  const names_arr = getNames(representation);
  return createCollectionWithUsers(names_arr, representation)
}

function getNames(representation) {
  const tabel = getTabelFromXLSX(representation);
  return [tabel['A1'].v, tabel['A2'].v, tabel['A3'].v, tabel['A4'].v]
}

function getTabelFromXLSX(representation) {
  const path = getUrlPath(representation);
  const workbook = XLSX.readFile(`./excel_table/${path}.xlsx`);
  const first_sheet_name = workbook.SheetNames[0];
  let tabel = workbook.Sheets[first_sheet_name];
  return deleteMarginsFromtabel(tabel)
}

function getUrlPath(representation) {
  if (representation == null) {
    return 'table_Ulemiste';
  } else {
    return `table_AT_${representation}`
  }
}

function deleteMarginsFromtabel(tabel) {
  delete tabel['!margins'];
  return tabel
}

function createCollectionWithUsers(names_arr, representation) {
  const tabel = getTabelFromXLSX(representation);
  let userDaysCollection = {};
  for (let i = 1; i <= names_arr.length; i++) {
    userDaysCollection[tabel[`A${i}`].v] = createWorkDaysArray(`A${i}`, i, representation);
  }
  return userDaysCollection
}

function createWorkDaysArray(id, number, representation) {
  const tabel = getTabelFromXLSX(representation);
  days_array = [];
  is_counting = false;
  counter = 0;
  for (key in tabel) {
    if (key == id) {
      is_counting = true;
    } else if (key === `A${number + 1}`) {
      return days_array
    } else {
      if (is_counting) {
        days_array.push(tabel[key].v);
        if (counter === (_.size(tabel) - 1)) {
          return days_array
        }
      }
    }
    counter += 1
  }
}

function getWorkerNameByDate(name, userDaysCollection, index) {
  for (worker in userDaysCollection) {
    if (name !== worker) {
      if (!_.isNaN(parseInt(userDaysCollection[worker][index]))) {
        return worker
      }
    }
  }
}

module.exports = {
  getNames,
  getCollectionWithUsers,
  getWorkerNameByDate
}
