const express = require('express');
const router = express.Router();


let Company = require('../models/Company')
let Calendar = require('../models/Calendar')
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

router.get('/companyinfo', async (req, res, next) => {

    let company = await Company.init();
    let companies = await company.findAll({ limit: 10 });
    res.json({
        companies: companies,
    })

});


router.get('/calendarInfo', async (req, res, next) => {

    let companyId = req.query.idCompany;

    let calendar = await Calendar.init();
    let calendars = await calendar.findAll({
        where : {
            idCompany : companyId
        }
    })
    let events = [];
    calendars.forEach(element => {
        let event = { title : element.dataValues.EventName, date : element.dataValues.EventDate}
        events.push(event);
    });
    res.send(events)

});


module.exports = router