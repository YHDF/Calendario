const Sequelize = require('../public/javascripts/db-connect').Sequelize;
const sequelize = require('../public/javascripts/db-connect').sequelize;
async function init() {
    Company = sequelize.define('Companies', {
        // Model attributes are defined here
        idCompany : {
            primaryKey : true,
            type : Sequelize.BIGINT(20),
            allowNull : false,
            autoIncrement : true,
        },
        companyName: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        companyLogo: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        countryCode: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        RegistredDefaultAddress: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
    }, {
        timestamps : false,
        tableName: 'Companies'
        // Other model options go here
    });
    await Company.sync();
    return Company;
}

module.exports.init = init;