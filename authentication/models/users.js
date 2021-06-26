var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: String,
    password: String
});


module.exports = mongoose.model('users', UserSchema);