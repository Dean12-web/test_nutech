const bcrypt = require('bcrypt');
const secretKey = 'dean12web';
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
    tokenValid : async (req, res, next) => {
        try {
            const headerToken = req.get('Authorization');
            if (!headerToken || !headerToken.startsWith('Bearer ')) {
                return res.status(401).json({
                    status: 108,
                    message: 'Token tidak valid atau kadaluwarsa',
                    data: null
                });
            }
            
            const token = headerToken.replace('Bearer ', '');
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                status: 108,
                message: 'Token tidak valid atau kadaluwarsa',
                data: null
            });
        }
    },
    secretKey,
    saltRounds,
    hashPassword : password => bcrypt.hashSync(password, saltRounds),
    bcrypt
}