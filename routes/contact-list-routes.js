// routes for contact list
//
//

const express = require('express');
const ContactListController = require('../controllers/contact-list-controller');
const isAuthenticated = require('../middlewares/auth-middleware');
const notFound = require('../middlewares/notfound-middleware');
const router = express.Router();

// for test, gets all contact list
router.get('/getAll', ContactListController.getAll);

// only users with tokens can access 

router.get(
    '/getList',
    isAuthenticated,
    ContactListController.getAllByUser
);

router.get(
    '/getLatest',
    isAuthenticated,
    ContactListController.getLatest
);

router.post(
    '/addContact',
    isAuthenticated,
    ContactListController.createValidate,
    ContactListController.create
);


router.delete('/deleteContact/:id',
    isAuthenticated,
    ContactListController.delete_
);

// for undefined routes
router.use(notFound);

module.exports = router;
