const Sequelize = require('../public/javascripts/db-connect').Sequelize;
const sequelize = require('../public/javascripts/db-connect').sequelize;
async function init() {
    Users = sequelize.define('Users', {
        // Model attributes are defined here
        idUsers : {
            primaryKey : true,
            type : Sequelize.BIGINT(20),
            allowNull : false,
            autoIncrement : true,
        },
        email: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        password: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        idCompany : {
            type : Sequelize.BIGINT(20),
        },
    }, {
        timestamps : true,
        tableName: 'Users'
        // Other model options go here
    });
    await Users.sync();
    return Users;
}

module.exports.init = init;