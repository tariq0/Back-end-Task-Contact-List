//
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    authorization: String,
    deviceToken: String,
    fingerPrint: String
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;