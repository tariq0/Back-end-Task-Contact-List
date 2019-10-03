//
//

const express = require('express');
const ContactListController = require('../controllers/contact-list-controller');
const router = express.Router();

router.get('/getList', ContactListController.getAll);
router.get('/getLatest', ContactListController.getLatest);

router.post('/addContact', ContactListController.create);
router.delete('/deleteContact/:id', ContactListController.delete_);

module.exports = router;
