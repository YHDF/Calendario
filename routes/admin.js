let express = require('express');
let router = express.Router();


let Company = require('../models/Company')

router.get('/companyinfo', async (req, res, next) => {

    var company = await Company.init();
    var companies = await company.findAll({ limit: 10 });
    res.json({
        companies : companies,
    })
    
});


module.exports = router