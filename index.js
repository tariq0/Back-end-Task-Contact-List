//
//
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const contactListRoutes = require('./routes/contact-list-routes');
const errorHandler = require('./middlewares/error-middleware');
const notFound = require('./middlewares/notfound-middleware');
const port = 4000;
const serverStartMessage = `server runs on port ${port}`;

// establish db connection
const dbConnection = require('./database');
const app = express();


app.use(express.json());
app.use('/auth', authRoutes);
app.use('/contacts', contactListRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(serverStartMessage);
});
