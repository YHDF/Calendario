const Sequelize = require('../public/javascripts/db-connect').Sequelize;
const sequelize = require('../public/javascripts/db-connect').sequelize;
async function init() {
    User = sequelize.define('Admins', {
        // Model attributes are defined here
        idAdmins : {
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
    }, {
        timestamps : false,
        tableName: 'Admins'
        // Other model options go here
    });
    await User.sync();
    return User;
}

module.exports.init = init;