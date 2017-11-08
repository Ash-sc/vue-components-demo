const notesModel = require('../mongo/').notesModel

exports.noteList = function(query = {}) {
  return new Promise((resolve, reject) => {
    notesModel.find(query, (err, result) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve(result)
      }
    })
  })
}

exports.newNote = function(data) {
  return new Promise((resolve, reject) => {
    notesModel.create(data, (err, result) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve(result)
      }
    })
  })
}

exports.updateNote = function(query = {}, data = {}) {
  return new Promise((resolve, reject) => {
    notesModel.update(query, data, (err) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve({})
      }
    })
  })
}

exports.deleteNote = function(query = {}) {
  return new Promise((resolve, reject) => {
    notesModel[ query.id ? 'deleteOne' : 'deleteMany' ](query, (err) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve({})
      }
    })
  })
}
