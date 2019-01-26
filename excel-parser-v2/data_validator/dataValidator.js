function checkMonth(monthDays, month, day) {
  if (month === 12 && day > monthDays) {
    return 1
  } else if (day > monthDays) {
    return month + 1
  } else return month
}


function checkDay(monthDays, day) {
  if (day > monthDays) {
    return 1
  } else return day
}


function checkYear(year, monthDays, month, day) {
  if (month === 12 && day > monthDays) {
    return year + 1
  } else return year
}

module.exports = {
  checkMonth,
  checkDay,
  checkYear
}
