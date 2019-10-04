
const resMessage = require('../configuration/response-message');

module.exports = (req, res, next)=>{
    res.statusCode = 404;
    res.json({message: resMessage.notFoundError});
}