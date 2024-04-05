const bcrypt = require('bcrypt');
const secretKey = 'dean12web';
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
    tokenValid: async (req,res,next) =>{
        try {
            
        } catch (error) {
            console.log(error)
            res.json('SOMETHING WENT WRONG')
        }
    },
    secretKey,
    saltRounds,
    hashPassword : password => bcrypt.hashSync(password, saltRounds),
    bcrypt
}