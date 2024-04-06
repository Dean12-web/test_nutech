const bcrypt = require('bcrypt');
const secretKey = 'dean12web';
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const path = require('path')
const multer = require('multer')
const uploadPath = path.join(__dirname, '..', 'public', 'images');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Format file tidak valid. Harap unggah file dengan format JPEG atau PNG.'), false)
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = {
    tokenValid: async (req, res, next) => {
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
    hashPassword: password => bcrypt.hashSync(password, saltRounds),
    bcrypt,
    upload
}