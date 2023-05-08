var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt')

var usersSchema = new Schema({
	'username' : String,
	'password' : String,
	'points' : Number
});

usersSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	})
})

module.exports = mongoose.model('users', usersSchema);


