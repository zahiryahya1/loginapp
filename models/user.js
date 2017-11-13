var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


// User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {

    // encrypt the password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(newUser.password, salt);

    newUser.password = hash;
    newUser.save(callback);
}