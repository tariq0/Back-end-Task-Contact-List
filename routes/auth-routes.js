//
//

const express = require('express');
const AuthControl = require('../controllers/auth-controller');
const router = express.Router();

router.get('/getUsers', AuthControl.getAll);

router.post('/signUp', AuthControl.createValidate,AuthControl.createUser);
router.delete('/getUser/:id', AuthControl.delete_);

router.use((err, req, res, next)=>{
    res.json({
        'error':err.message
    })
});

module.exports = router;
