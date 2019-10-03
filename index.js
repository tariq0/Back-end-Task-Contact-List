//
//
const express = require('express');
const homeRoutes = require('./routes/home-routes');
const authRoutes = require('./routes/auth-routes');
const contactListRoutes = require('./routes/contact-list-routes');

const port = 4000;
const sucessMessage = 'server runs on port' + port;

const dbConnection = require('./database');
const app = express();


app.use(express.json());

app.use('', homeRoutes);
app.use('/auth', authRoutes);
app.use('/contacts', contactListRoutes);

app.listen(port, () => {
    console.log(sucessMessage);
});
