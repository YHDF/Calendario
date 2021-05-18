let express = require('express');
let router = express.Router();


let Admin = require('../models/Admins')
let hasher = require('../public/javascripts/hasher')


router.post('/connect', async (req, res, next) => {
    const email = req.body.email;
    
    //const password = req.body.password;
    let admin = await Admin.init();
    let admins = await admin.findOne({
        where : {
            email : email,
        }
    });
    admins === null ? res.json({
        user : 'Email not Found',

    }) : res.json({
        hash : await hasher.compareHash(req, res, next , admins.password)
    })
    
});




module.exports = router;