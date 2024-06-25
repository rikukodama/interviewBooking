const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql210.epizy.com',
  user: 'epiz_34192981',
  password: 'tMVmXxKSPtNA',
  database: 'epiz_34192981_questymes'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
  }
});

module.exports = connection;
