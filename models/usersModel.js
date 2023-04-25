var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var usersSchema = new Schema({
	'username' : String,
	'password' : String,
	'points' : Number
});

module.exports = mongoose.model('users', usersSchema);


