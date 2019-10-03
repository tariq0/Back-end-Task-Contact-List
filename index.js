//
//
const express = require('express');
const homeRoutes = require('./routes/home-routes');

const port = 4000;
const sucessMessage = 'server runs on port' + port;

const dbConnection = require('./database');
const app = express();



app.use('', homeRoutes);
app.listen(port, () => {
    console.log(sucessMessage);
});
