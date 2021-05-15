let express = require('express');
let router = express.Router();
let cors = require('cors')


let Admin = require('../models/Admins')
let hasher = require('../public/javascripts/hasher')

router.use(cors({ origin: 'http://localhost:3000' }));

router.post('/connect', async (req, res, next) => {
    const email = req.body.email;
    //const password = req.body.password;
    let admin = await Admin.init();
    let admins = await admin.findOne({
        where : {
            email : email,
        }
    });
    res.send(await hasher.compareHash(req, res, next , admins.password))
});




module.exports = router;