const bcrypt = require('bcrypt');
const saltRounds = 10;


async function compareHash(req, res, next, db_hash){
    return bcrypt.compareSync(req.body.password, db_hash, function(err, result) {

    });
}

async function hash(req, res, next){
    var hash = await encrypt(req.body.password);  
    return hash;
}



function encrypt(password){
    return new Promise(async function(resolve, reject){
        bcrypt.hash(password, saltRounds, async function (err, hash){
            resolve(hash);
        });      
    })
}

module.exports.compareHash = compareHash;
module.exports.hash = hash;