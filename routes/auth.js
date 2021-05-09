let express = require('express');
let router = express.Router();


router.get('/connect', (req, res, next) => {
    res.render('auth/connect');
})




module.exports = router;