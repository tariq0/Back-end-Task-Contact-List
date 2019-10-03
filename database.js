// database
const mongoose = require('mongoose');

// db config
const server = '127.0.0.1';
const port =  27017;
const database = 'ContactListApp';
const connectionSuc = `database connected @ ${server}:${port} db:${database}`;
const connectionFail = `database faild to connect ${server}:${port}`;

// db connection
class DataBase{
    constructor(){
        this._connect();
    }

    _connect(){
        mongoose.connect(`mongodb://${server}:${port}/${database}`, {useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}).
        then(()=>{
            console.log(connectionSuc);
        }).
        catch(()=>{
            console.log(connectionFail);
        })
    }
}

module.exports = new DataBase();