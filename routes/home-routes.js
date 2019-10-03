//
//

const express = require('express');

const router = express.Router();

router.get('',(req, res, next)=>{
    const authToken = req.get('authorization');
    const devToken = req.get('token');
    const fingToken = req.get('finger');

    res.send('welcome home '+authToken+' '+devToken+' '+fingToken);
});

module.exports = router;