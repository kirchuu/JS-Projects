const workPlacesArray = ['Arvutitark', 'Ulemiste'];
const workRepresentationArray = ['Kristiine', 'Parnu', 'Vesse', 'Kaubamaja', 'Magistral', 'Tartu', 'Lounakeskus', 'Rocca', 'Narva'];


function getWorkPlaces() {
  return workPlacesArray
}

function getWorkRepresentation() {
  return workRepresentationArray
}

module.exports = {
  getWorkPlaces,
  getWorkRepresentation
}
