var pool = require('../mysql/').pool

exports.qaList = function(query) {
  var sqlStr = 'SELECT question,' +
    'answer,' +
    'date_format(update_time,\'%Y-%m-%d %H:%i:%s\') as updateTime,' +
    'category_id as categoryId,' +
    'kind,' +
    'operator' +
    ' FROM question_list' +
    ' WHERE is_delete = 0' + (query.categoryId ? (' && category_id in (' + parseInt(query.categoryId, 10) + ')') : '') +
    ' ORDER BY update_time DESC'
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) reject(err)
      else {
        connection.query(sqlStr, function(error, results, fields) {
          if (error) reject(error)
          else {
            return resolve({
              total: results.length,
              data: results.slice(query.page - 1, query.page * query.size)
            })
          }
        })
      }
      connection.release()
    })
  })
}

exports.getCategory = function() {
  var sqlStr = 'SELECT category' + 
  ' FROM question_category' +
  ' WHERE 1'
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) reject(err)
      else {
        connection.query(sqlStr, function(error, results, fields) {
          if (error) reject(error)
          else {
            return resolve({
              data: JSON.parse(results[0].category)
            })
          }
        })
      }
      connection.release()
    })
  })
}

exports.updateCategory = function(str) {
  var sqlStr = 'UPDATE question_category' +
  ' SET category = \'' + str + '\'' +
  ' WHERE 1'
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) reject(err)
      else {
        connection.query(sqlStr, function(error, results, fields) {
          if (error) reject(error)
          else {
            return resolve({
              success: true
            })
          }
        })
      }
      connection.release()
    })
  })
}

exports.newQuestion = function(data) {
  var sqlStr = 'INSERT INTO question_list' +
  ' (question, answer, category_id, kind, operator, url)' +
  ' VALUES (' +
  '\'' + data.question + '\',' +
  '\'' + data.answer + '\',' +
  data.id + ',' +
  '\'' + data.kind + '\',' +
  '\'' + data.operator + '\',' +
  '\'' + data.url + '\')'
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) reject(err)
      else {
        connection.query(sqlStr, function(error, results, fields) {
          if (error) reject(error)
          else {
            return resolve({
              success: true
            })
          }
        })
      }
      connection.release()
    })
  })
}
