// used to manage users
// to test the application only 
// we create users
// with specific authentication attributes
//
//
const { check, validationResult } = require('express-validator');
const Model = require('../models/user');

const successMessage = 'success';

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

// simple validation on  user signup 
const createValidate = [
    check('name','must be 3 characters at least').isLength({ min: 3 }),
    check('authorization','must be 8 characters at least').isLength({ min: 8 }),
    check('deviceToken','must be 8 characters at least').isLength({ min: 8 }),
    check('fingerPrint','must be 8 characters at least').isLength({ min: 8 })
]


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