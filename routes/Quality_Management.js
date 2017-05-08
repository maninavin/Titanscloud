var express = require('express');
var passport = require('passport');
var db = require('./db');
var conn = db.getConnection();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
	var dept_name=req.body.dept_name; 
	conn.query('SELECT first_name ,last_name  FROM dept_manager d LEFT JOIN employees e ON e.emp_no=d.emp_no WHERE dept_no = ?',"d006",function(err, rows){
		if(err) {
			console.log(err);
			res.render('error', {error: 'Problem Occured'});
			} else {
				if(rows.length >0){
					res.render('Quality_Management', {d: rows});
				}

}
});
});
router.post('/search', ensureLoggedIn, function(req, res, next) {
	var emp_name = req.body.emp_name;
	var dep="Development";
	var query="SELECT * FROM dept_emp de LEFT JOIN departments ON departments.dept_no=de.dept_no LEFT JOIN employees e ON e.emp_no=de.emp_no WHERE e.last_name ='"+emp_name+"' and dept_name='Production' ";
	console.log("query = "+ query);
	conn.query("SELECT e.emp_no,first_name,last_name,birth_date,gender,hire_date,departments.dept_no,departments.dept_name,from_date,to_date FROM dept_emp de LEFT JOIN departments ON departments.dept_no=de.dept_no LEFT JOIN employees e ON e.emp_no=de.emp_no WHERE e.first_name ='"+emp_name+"' and dept_name='Quality Management' limit 1",function(err, rows){
		console.log("Query is executing");
		if(err) {
			console.log(err);
			res.render('error', {error: 'Problem Occured'});
			} else {
				console.log(" Number of row "+rows.length);
				if(rows.length >0){
					console.log(rows.length);
					res.render('search', {search: rows});
				}

}
});
});

module.exports = router;