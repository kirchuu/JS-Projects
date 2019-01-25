const _ = require('lodash');
const XLSX = require('xlsx');
const workbook = XLSX.readFile('./excel_table/table.xlsx');
const first_sheet_name = workbook.SheetNames[0];
const tabel = deleteMarginsFromTabel();


function deleteMarginsFromTabel() {
  table = workbook.Sheets[first_sheet_name];
  delete table['!margins'];
  return table
}

function getNames() {
  return [tabel['A1'].v, tabel['A2'].v, tabel['A3'].v, tabel['A4'].v]
}

function getCollectionWithUsers() {
  names_arr = getNames();
  return createCollectionWithUsers(names_arr)
}

function createCollectionWithUsers(names_arr) {
  userDaysCollection = {}
  for (let i = 1; i <= names_arr.length; i++) {
    userDaysCollection[tabel[`A${i}`].v] = createWorkDaysArray(`A${i}`, i);
  }
  return userDaysCollection
}

function createWorkDaysArray(id, number) {
  days_array = []
  is_counting = false
  counter = 0
  for (key in tabel) {
    if (key == id) {
      is_counting = true
    } else if (key === `A${number + 1}`) {
      return days_array
    } else if (counter === (_.size(tabel) - 1)) {
      days_array.push(tabel[key].v);
      return days_array
    } else {
      if (is_counting) {
        days_array.push(tabel[key].v);
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
