//
//

const UserModel = require('../models/user');

function isAuthenticated(req, res, next) {

    const findBy = {
        authorization: req.get('authorization'),
        deviceToken: req.get('deviceToken'),
        fingerPrint: req.get('fingerPrint')
    }
    if (findBy.authorization === undefined 
        || findBy.deviceToken === undefined
        || findBy.fingerPrint === undefined
        ){
            console.log('undefined case');
            res.statusCode = 401;
            return res.json({
                message: 'you are not authorized'
            });
        }
    console.log(findBy);
    UserModel.find(findBy).
        then(doc => {
            if (doc.length === 0) {
                res.statusCode = 401;
                res.json({
                    message: 'you are not authorized'
                })
            } else {
                console.log(doc);
                console.log(Array.isArray(doc) )
                next();
            }
        }).
        catch(err => {
            next(err);
        })


}

module.exports = isAuthenticated;