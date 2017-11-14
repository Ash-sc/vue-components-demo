var mysql = require('mysql')
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '54haotiangeA!',
  database: 'doc_center'
})

pool.getConnection(function(err, connection) {
  if (err) {
    console.log('mysql connect error: %s', err)
  } else {
    console.log('mysql connect success!')
  }
})

module.exports = {
  pool
}
