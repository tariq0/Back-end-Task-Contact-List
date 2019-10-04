//
const mongoose = require('mongoose');

const ContactListSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true
        },
        mobileNumber: [String],
        createdAt: {
            type: Date,
            default: Date.now
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
    versionKey: false
    }
)

const ContactListModel = mongoose.model('ContactList', ContactListSchema);

module.exports = ContactListModel;