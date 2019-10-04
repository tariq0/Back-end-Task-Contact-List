// used to manage users
// to test the application only 
// we create users
// with specific authentication attributes
//
//
const { check, validationResult } = require('express-validator');
const Model = require('../models/user');

const resMessage = require('../configuration/response-message');
//const ResponseObject = require('../models/response-object');

// simple validation on  user signup 
const createValidate = [
    check('name').
        isLength({ min: 3 }).
        withMessage('name must be 3 characters at least'),

    check('authorization').
        isLength({ min: 8 }).
        withMessage('authorization must be 8 characters at least'),

    check('deviceToken').
        isLength({ min: 8 }).
        withMessage('deviceToken must be 8 characters at least'),

    check('fingerPrint').
        isLength({ min: 8 }).
        withMessage('fingerPrint must be 8 characters at least')
]



function getAll(req, res, next) {
    Model.find().
        then((doc) => {
            res.json(doc);
        }).
        catch((err) => {
            res.statusCode = 500;
            err.message = resMessage.connectionError;
            next(err);
        })
}



function createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).
            json({ message: errors.array()[0].msg });
    }
    const instance = new Model(req.body);
    instance.save().
        then(() => {
            res.json({ message: resMessage.successMessage });
        }).
        catch((err) => {
            // unique field error
            if (err.name == 'MongoError' && err.code) {
                res.statusCode = 409;
                const fieldName = Object.keys(err.keyPattern)[0];
                const message = `enter another value for '${fieldName}'`;
                err.message = message;
            } else {
                // connection error
                res.statusCode = 500;
                err.message = resMessage.connectionError;
            }
            next(err);
        })
}



function delete_(req, res, next) {
    Model.deleteOne({ _id: req.params.id }).
        then(() => {
            res.json({ message: resMessage.successMessage });
        }).
        catch((err) => {
            // connection errors  cast errors
            if (err.name == 'CastError') {
                res.statusCode = 404;
                next();
            } else {
                res.statusCode = 500;
                err.message = resMessage.connectionError;
                next(err);
            }
        })
}



module.exports = {
    getAll: getAll,
    createUser: createUser,
    delete_: delete_,
    createValidate: createValidate
}