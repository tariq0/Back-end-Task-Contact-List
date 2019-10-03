//
//
const Model = require('../models/contact-list');

function getAll(req, res, next) {
    Model.find().
    then((doc)=>{
        res.json(doc);
    }).
    catch((err)=>{
        next(err);
    })
}

function getLatest(req, res, next) {
    Model.find().limit(5).sort({date: -1}).
    then((doc)=>{
        res.json(doc);
    }).
    catch((err)=>{
        next(err);
    })
}

function create(req, res, next) {
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
    getLatest: getLatest,
    create: create,
    delete_: delete_
}