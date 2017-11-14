var pool = require('../mysql/').pool

var htmlToText = function(html) {
  return html.replace().replace(/<[^>]+>/g, '').replace(/\n/g, '')
}

exports.searchDocList = function(query) {
  var sqlStr = 'SELECT content,' +
    ' url,' +
    ' title' +
    ' FROM doc_content' +
    ' WHERE ' + (query.product ? ('product_name = \'' + query.product + '\'') : '1') +
    ' ORDER BY update_time DESC'
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) reject(err)
      else {
        connection.query(sqlStr, function(error, results, fields) {
          if (error) reject(error)
          else {
            var data = []
            for (var i = 0, j = results.length; i < j; i += 1) {
              if (htmlToText(results[i].content).indexOf(query.keywords) >= 0) {
                data.push({
                  path: results[i].url,
                  title: results[i].title,
                  content: htmlToText(results[i].content)
                })
              }
            }
            return resolve({
              data: data
            })
          }
        })
      }
      connection.release()
    })
  })
}
