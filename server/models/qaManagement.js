var pool = require('../mysql/').pool

exports.qaList = function(query) {
  var sqlStr = 'SELECT question,' +
      'answer,' +
      'date_format(update_time,\'%Y-%m-%d %H:%i:%s\') as updateTime,' +
      'category_id as categoryId,' +
      'kind,' +
      'operator' +
    ' FROM question_list' +
    ' WHERE is_delete = 0' + (query.categoryId ? (' && category_id in (' + parseInt(query.categoryId, 10) + ')') : '')
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
