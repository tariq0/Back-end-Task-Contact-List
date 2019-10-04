//
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: String,
        authorization: {
            type: String,
            unique: true
        },
        deviceToken: {
            type: String,
            unique: true
        },
        fingerPrint: {
            type: String,
            unique: true
        },
        contactsIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ContactList'
            }
        ]
    },
    {
        versionKey: false
    }
)

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;