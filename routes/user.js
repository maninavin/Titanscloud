var express = require('express');
var passport = require('passport');
var db = require('./db');
var conn = db.getConnection();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
	conn.query('select * from departments',function(err, rows){
  res.render('user', { departments: rows , user: req.user });
 
});
});

module.exports = router;
