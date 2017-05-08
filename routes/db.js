var mysql = require('mysql');

function getConnection() {
var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'employees'
	});
return connection;
}
exports.getConnection = getConnection;