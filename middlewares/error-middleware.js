
const resMessage = require('../configuration/response-message');


module.exports = (err, req, res, next)=>{
    if(res.statusCode != 200){
        res.json({message: err.message});
    }else{
        res.statusCode = 500;
        res.json({message: resMessage.connectionError});
    }
}