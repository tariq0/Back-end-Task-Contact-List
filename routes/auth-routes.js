//
//

const express = require('express');
const AuthControl = require('../controllers/auth-controller');
const router = express.Router();

router.get('', AuthControl.getAll);

router.post('', AuthControl.create);
router.delete('/:id', AuthControl.delete_);

module.exports = router;
