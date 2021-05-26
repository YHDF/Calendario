const express = require('express');
const router = express.Router();
const multer = require('multer');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


const hasher = require('../public/javascripts/hasher')
const User = require('../models/User');
const Company = require('../models/Company')

const path = './public/images'
let upload = multer({ dest: path });


let options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yh',
    database: 'Calendario',
    clearExpired: true,
    checkExpirationInterval: 10000,
    schema: {
        tableName: 'ClientSession'
    }
};
let sessionStore = new MySQLStore(options);


const THIRTY_MIN = 1000 * 60 * 30;
const {
    SESS_MAXAGE = THIRTY_MIN,
    NODE_ENV = 'developement',
    SESS_NAME = 'client-session',
    SESS_SECRET = 'secret'
} = process.env;
const SECURE = NODE_ENV === 'production'

router.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store: sessionStore,
    cookie: {
        sameSite: 'lax',
        maxAge: SESS_MAXAGE,
        httpOnly: false,
        secure: SECURE
    }
}))



router.post('/login', async (req, res, next) => {

    const email = req.body.email;
    let user = await User.init();
    let users = await user.findOne({
        where: {
            email: email,
        }
    });


    if (users === null) {
        return res.json({
            user: 'Email not Found',
        })
    } else {
        let samePassword = await hasher.compareHash(req, res, next, users.password)
        let company = await Company.init();
        let companies = await company.findOne({
            where: {
                idCompany: users.idCompany
            }
        });
        req.session.save();
        samePassword ? res.json({
            hash: true,
            companyInfo: companies,
            session_id: req.sessionID,
        }) : res.json({
            hash: false,
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
        password: samePassword
    }).catch((err) => {
        if (err.errors[0].message === 'email_UNIQUE must be unique') {
            validationMessage = 'email must be unique'
        }
    })
    req.session.save();
    res.json({
        validation: validationMessage,
        session_id: req.sessionID,
        email: email
    });


});


router.post('/saveimage', upload.single("files"), async (req, res, next) => {

    let file = req.file.filename;
    res.send(file);
    //res.send(events)

});




router.post('/createcompany', async (req, res, next) => {
    let email = req.body.email;
    let company = await Company.init();
    let companies = await company.create({
        companyName: req.body.name,
        companyLogo: req.body.image,
        RegistredDefaultAddress: req.body.address
    });
    let user = await User.init();
    let users = await user.update(
        {
            idCompany: companies.idCompany
        },
        {
            where: {
                email: email,
            }
        });
    res.json({
        companies: companies,
    })

});

module.exports = router