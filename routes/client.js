const express = require('express');
const router = express.Router();


const hasher = require('../public/javascripts/hasher')
const User = require('../models/User');

const multer = require('multer');
const path = './public/images'
let upload = multer({ dest: path });



router.post('/login', async (req, res, next) => {

    const email = req.body.email;
    console.log(email)
    let user = await User.init();
    let users = await user.findOne({
        where: {
            email: email,
        }
    });
    console.log(users)
    if (users === null) {
        return res.json({
            user: 'Email not Found',
        })
    } else {
        let samePassword = await hasher.compareHash(req, res, next, users.password)
        samePassword ? res.json({
            hash: true,
        }) : res.json({
            hash: false,
            //session_id = req.sessionID
        })
    }


});



router.post('/join', async (req, res, next) => {

    let validationMessage = null;

    const email = req.body.email;
    let samePassword = await hasher.hash(req, res, next)
    let user = await User.init();
    let users = await user.create({
        email: email,
        password : samePassword
    }).catch((err) => {
        if(err.errors[0].message === 'email_UNIQUE must be unique'){
            validationMessage  = 'email must be unique'
        }
    })
    res.json({
        validation : validationMessage
    });


});


router.post('/saveimage', upload.single("files"),async (req, res, next) => {
    let fileArr = req.file.originalname.split('.');
    let fileType = fileArr[fileArr.length - 1]
    let fileDestination = req.file.path;
    let file = fileDestination + '.' +fileType
    console.log(file)
    res.send(file);
    //res.send(events)

});




router.post('/createcompany',async (req, res, next) => {
    console.log(req.body)
    //res.send(events)

});

module.exports = router