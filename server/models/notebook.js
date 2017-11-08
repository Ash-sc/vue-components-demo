const notebooksModel = require('../mongo/').notebooksModel

exports.getList = function(query = {}) {
  return new Promise((resolve, reject) => {
    notebooksModel.find(query, (err, result) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve(result)
      }
    })
  })
}


exports.newNotebook = function(data) {
  return new Promise((resolve, reject) => {
    notebooksModel.create(data, (err, result) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve({})
      }
    })
  })
}

exports.deleteNotebook = function(data) {
  return new Promise((resolve, reject) => {
    notebooksModel.deleteOne(data, (err) => {
      if (err) {
        reject('Server error, please do it later.')
      } else {
        return resolve({})
      }
    })
  })
}
