const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         
  database: 'test'   
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Kết nối MySQL thành công!');
});

module.exports = connection;
