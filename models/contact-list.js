//
const mongoose = require('mongoose');

const ContactListSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: [String],
    date: {
        type: Date,
        default: Date.now
    },
    authorization: String,
    deviceToken: String,
    fingerPrint: String
})

const ContactListModel = mongoose.model('contactList', ContactListSchema);

module.exports = ContactListModel;