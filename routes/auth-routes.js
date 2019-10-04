//
//

const express = require('express');
const AuthControl = require('../controllers/auth-controller');
const notFound = require('../middlewares/notfound-middleware');

const router = express.Router();

router.get('/getUsers', AuthControl.getAll);

router.post(
    '/signUp',
    AuthControl.createValidate,
    AuthControl.createUser
);

router.delete('/getUser/:id', AuthControl.delete_);

// for undefined routes
router.use(notFound);

module.exports = router;
