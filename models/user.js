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

module.exports.getUserByUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    // Load hash from your password DB. 
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}