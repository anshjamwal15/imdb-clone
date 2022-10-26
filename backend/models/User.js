var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    token: String
}, { versionKey: false });

User = mongoose.model('User', userSchema);

module.exports = User;