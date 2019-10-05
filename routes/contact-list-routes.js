// routes for contact list
//
//

const express = require('express');
const ContactsController = require('../controllers/contact-list-controller');
const isAuthenticated = require('../middlewares/auth-middleware');
const notFound = require('../middlewares/notfound-middleware');
const router = express.Router();

// for test, gets all contact list
router.get('/getAll', ContactsController.getAll);

// only users with tokens can access 

router.get(
    '/getList',
    isAuthenticated,
    ContactsController.getAllByUser
);

router.get(
    '/getLatest',
    isAuthenticated,
    ContactsController.getLatest
);

router.post(
    '/addContact',
    isAuthenticated,
    ContactsController.createValidate,
    ContactsController.addNewContact
);


router.delete('/deleteContact/:id',
    isAuthenticated,
    ContactsController.delete_
);

// for undefined routes
router.use(notFound);

module.exports = router;
