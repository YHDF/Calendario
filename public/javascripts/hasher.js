const bcrypt = require('bcrypt');
const saltRounds = 10;


async function compareHash(req, res, next, db_hash){
    return bcrypt.compareSync(req.body.password, db_hash, function(err, result) {

    });
}

async function hash(req, res, next, db_hash){
    var hash = await encrypt();  
    return hash;
}



function encrypt(){
    return new Promise(async function(resolve, reject){
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash){
            resolve(hash);
        });      
    })
}

module.exports.compareHash = compareHash;
module.exports.hash = hash;