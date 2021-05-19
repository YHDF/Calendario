let express = require('express');
let router = express.Router();


let Company = require('../models/Company')
let Calendar = require('../models/Calendar')

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