let express = require('express');
let router = express.Router();


router.get('/connect', (req, res, next) => {
    res.redirect('http://localhost:8080/connect')
})




module.exports = router;