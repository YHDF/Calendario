const express = require('express');
const router = express.Router();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);




let Company = require('../models/Company')
let Calendar = require('../models/Calendar')
let Admin = require('../models/Admins')
let hasher = require('../public/javascripts/hasher')


let options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yh',
    database: 'Calendario',
    clearExpired: true,
    checkExpirationInterval: 10000,
};
let sessionStore = new MySQLStore(options);


const THIRTY_MIN = 1000 * 60 * 30;
const {
    SESS_MAXAGE = THIRTY_MIN,
    NODE_ENV = 'developement',
    SESS_NAME = 'admin-session',
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


router.get('/checkauth', (req, res, next) => {
    console.log(req.session.session_id);
    return res.json({
        session_id : req.session.session_id
    });
})


router.post('/connect', async (req, res, next) => {

    const email = req.body.email;

    //const password = req.body.password;
    let admin = await Admin.init();
    let admins = await admin.findOne({
        where: {
            email: email,
        }
    });
    let samePassword = await hasher.compareHash(req, res, next, admins.password)
    req.session.save();
    admins === null ? res.json({
        user: 'Email not Found',
    }) : samePassword ? res.json({
        hash : true,
        session_id : req.sessionID
    }) : res.json({
        hash : false,
        //session_id = req.sessionID
    })

});

router.get('/companyinfo', async (req, res, next) => {

    let company = await Company.init();
    let companies = await company.findAll({ limit: 10 });
    res.json({
        companies: companies,
    })

});


router.get('/calendarinfo', async (req, res, next) => {
    let companyId = req.query.idCompany;
    let calendar = await Calendar.init();
    let calendars = await calendar.findAll({
        where: {
            idCompany: companyId
        }
    })
    let events = [];
    calendars.forEach(element => {
        let event = { id : element.dataValues.idCalendars ,  title: element.dataValues.EventName, date: element.dataValues.EventDate }
        events.push(event);
    });
    res.send(events)

});


router.delete('/deleteevent', async (req, res, next) => {
    let idCompany = req.query.idCompany;
    let calendar = await Calendar.init();
    await calendar.destroy({
        where: {
            idCalendars: idCompany
        }
    });



});

module.exports = router