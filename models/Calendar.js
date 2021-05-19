const Sequelize = require('../public/javascripts/db-connect').Sequelize;
const sequelize = require('../public/javascripts/db-connect').sequelize;
async function init() {
    Calendar = sequelize.define('Calendars', {
        // Model attributes are defined here
        idCalendars : {
            primaryKey : true,
            type : Sequelize.BIGINT(20),
            allowNull : false,
            autoIncrement : true,
        },
        idCompany : {
            type : Sequelize.BIGINT(20),
        },
        
        EventName: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        EventDate: {
            type: Sequelize.DATE
            // allowNull defaults to true
        },
        
    }, {
        timestamps : false,
        tableName: 'Calendars'
        // Other model options go here
    });
    await Calendar.sync();
    return Calendar;
}

module.exports.init = init;