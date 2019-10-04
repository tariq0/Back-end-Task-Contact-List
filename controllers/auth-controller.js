// used to manage users
// to test the application only 
// we create users
// with specific authentication attributes
//
//
const { check, validationResult } = require('express-validator');
const Model = require('../models/user');

const successMessage = 'success';

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
    then((doc)=>{
        res.json(doc);
    }).
    catch((err)=>{
        next(err);
    })
}

function createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const instance = new Model(req.body);
    instance.save().
    then(()=>{
        res.json({message: 'success'});
    }).
    catch((err)=>{
        next(err);
    })
}




function delete_(req, res, next) {
    Model.deleteOne({_id: req.params.id}).
    then(()=>{
        res.json({message: 'success'});
    }).
    catch((err)=>{
        next(err);
    })
}

module.exports = {
    getAll: getAll,
    createUser: createUser,
    delete_: delete_,
    createValidate: createValidate
}