// middleware used to authenticate requests
//

const UserModel = require('../models/user');
const resMessage = require('../configuration/response-message');

function isAuthenticated(req, res, next) {
    
    const authorization = req.get('authorization');
    const deviceToken = req.get('deviceToken');
    const fingerPrint =  req.get('fingerPrint');
    // if these headers are empty 
    // user is unthorized
    if (authorization === undefined
        || deviceToken === undefined
        || fingerPrint === undefined
    ) {
        res.statusCode = 401;
        const error = new Error(resMessage.unauthorizedError);
        return next(error);
    }
    // filter results by it.
    const findBy = { 
        authorization: authorization,
        deviceToken: deviceToken,
        fingerPrint: fingerPrint
    }
    
    UserModel.findOne(findBy).
        then(doc => {
            if (!doc) { 
                res.statusCode = 401;
                const error = new Error(resMessage.unauthorizedError);
                return next(error);
            } else { 
                // if request is auth set req.userId = user id
                // and isert username also to used in response
                req.userId = doc._id;
                req.userName = doc.name;
                next();
            }
        }).
        catch(err => {
            res.statusCode = 500;
            err.message = resMessage.connectionError;
            next(err);
        })


}

module.exports = isAuthenticated;