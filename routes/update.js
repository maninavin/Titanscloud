var express = require('express');
var passport = require('passport');
var db = require('./db');
var conn = db.getConnection();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var conn = db.getConnection();

/* GET user profile. */
router.post('/', function(req, res, next) {
                var EmpId =req.body.EmpId;
                console.log(" The Employee id "+EmpId);
				var first_name=req.body.fName; 
				console.log("the First Name "+ first_name);
				var last_name=req.body.LName;
				var birth_date=req.body.Birth;
				console.log(birth_date);
				var Gender =req.body.Gender;
				console.log("Gender"+Gender);
				var Hire_Date =req.body.HDate;
				console.log(Hire_Date);
				var dept_name=req.body.DName;
				var dept_no=req.body.DNo;
				var fdate=req.body.FDate;
				var tdate=req.body.TDate;
				
				console.log("update query executing" );
				//var query= "UPDATE employees SET ? WHERE emp_no=',[{ 'first_name': first_name,'last_name': last_name ,'birth_date': birth_date}, EmpId ";
				conn.query('UPDATE employees SET ? WHERE emp_no=?',[{ 'first_name': first_name,'last_name': last_name ,'gender': Gender,'birth_date': birth_date,'hire_date':Hire_Date}, EmpId  ],function(err, rows){
					if(err) {
						console.log(err);
						res.status(500);
						res.send({error: 'Problem Occured'});
						} else {
							console.log("Updated");
							res.status(200);
							res.send({msg: 'Sucessfully updated', title: 'success'});
							res.render('search');
						}
					
				
});
});
			

module.exports = router;