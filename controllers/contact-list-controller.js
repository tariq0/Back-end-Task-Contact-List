//
//
const { check, validationResult } = require('express-validator');

const Model = require('../models/contact-list');
const ResponseObject = require('../models/response-object');
const resMessage = require('../configuration/response-message');

const createValidate =
    [   
        // array of validation middlewares specific to 
        // to contactlist controller
        check('email').
            isEmail().
            withMessage('please enter valid email'),

        check('mobileNumber').
            isMobilePhone().
            withMessage('please enter valid phone number'),

        check('firstName').
            isLength({ min: 3 }).
            withMessage('first name must be at least 3 characters'),

        check('lastName').
            isLength({ min: 3 }).
            withMessage('last name must be at least 3 characters')
    ]


// get all records
function getAll(req, res, next) {
    Model.find().
        then((doc) => {
            const resObj = new ResponseObject(
                resMessage.successMessage,
                doc
            );
            res.json(resObj);
        }).
        catch((err) => {
            res.statusCode = 500;
            err.message = resMessage.connectionError;
            next(err);
        })
}

// get records for specific user
// which is getList
function getAllByUser(req, res, next) {
    Model.find({ userId: req.userId }).
        then((doc) => {
            const resObj = new ResponseObject(
                resMessage.successMessage,
                doc
            );
            res.json(resObj);
        }).
        catch((err) => {// connection errors
            res.statusCode = 500;
            err.message = resMessage.connectionError;
            next(err);
        })
}


// get latest 5 entries for specific  user
function getLatest(req, res, next) {
    Model.find({ userId: req.userId }).
        limit(5).sort({ createdAt: -1 }).
        then((doc) => {
            const resObj = new ResponseObject(
                resMessage.successMessage,
                doc
            );
            res.json(resObj);
        }).
        catch((err) => {// connection errors
            res.statusCode = 500;
            err.message = resMessage.connectionError;
            next(err);
        })
}


// add contacts
function addNewContact(req, res, next) {

    const errors = validationResult(req);
    // validation errors
    if (!errors.isEmpty()) {
        return res.status(422).
        json({  message: errors.array()[0].msg });
    }
    // setting contact user id
    let instance = new Model(req.body);
    instance.userId = req.userId;
    // saving to database
    instance.save().
        then(() => {
            const resObj = new ResponseObject(
                resMessage.successMessage,
                instance
            );
            res.json(resObj);
        }).
        catch((err) => {
            if(err.name == 'MongoError' && err.code){
                // unique email field error
                res.statusCode = 409;
                err.message = resMessage.emailExistError;
                next(err);
            }else{
                res.statusCode = 500;
                err.message = resMessage.connectionError;
                next(err);
            }
           
        })
}

// delete records if needed
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
    getLatest: getLatest,
    addNewContact: addNewContact,
    delete_: delete_,
    createValidate: createValidate,
    getAllByUser: getAllByUser
}