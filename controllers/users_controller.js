const pool = require('../config/config.js')
const {
    hashPassword,
    bcrypt
} = require('../helpers/utils.js')
const jwt = require('jsonwebtoken');
const {
    secretKey,
    upload
} = require('../helpers/utils.js')
const multer = require('multer')

class Controller {
    static async postLogin(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(email)) {
                return res.status(400).json({
                    status: 102,
                    message: "Parameter email tidak sesuai format",
                    data: null
                });
            }
            const query = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
            const user = query.rows[0];
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(404).json({
                    status: 103,
                    message: "Email atau password salah",
                    data: null
                });
            }
            const token = jwt.sign({
                user: user.email
            }, secretKey);
            return res.status(200).json({
                status: 0,
                message: "Login Sukses",
                data: {
                    token: token
                }
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getUsers(req, res, next) {
        try {
            const email = req.user.user
            const data = await pool.query(`SELECT email, first_name,last_name,profile_image FROM users WHERE email = $1`, [email])
            res.json({
                status: 0,
                message: "Sukses",
                data: data.rows
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async postUsers(req, res, next) {
        try {
            const {
                email,
                first_name,
                last_name,
                password
            } = req.body;
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(email)) {
                return res.status(400).json({
                    status: 102,
                    message: "Parameter email tidak sesuai format",
                    data: null
                });
            }

            if (password.length < 8) {
                return res.status(400).json({
                    status: 102,
                    message: "Password minimal harus 8 karakter",
                    data: null
                });
            }

            const existingUser = await pool.query(
                `SELECT * FROM users WHERE email = $1`,
                [email]
            );


            if (existingUser.rows.length > 0) {
                return res.status(400).json({
                    status: 121,
                    message: "Email sudah digunakan",
                    data: null
                });
            }

            const hashedPassword = hashPassword(password);
            await pool.query(
                `INSERT INTO users(email, first_name, last_name, password) VALUES($1, $2, $3, $4)`,
                [email, first_name, last_name, hashedPassword]
            );
            res.status(200).json({
                status: 0,
                message: "Registrasi berhasil, silahkan login",
                data: null
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updateUsers(req, res, next) {
        try {
            const {
                first_name,
                last_name
            } = req.body;
            const email = req.user.user
            await pool.query(`UPDATE users SET first_name =$1, last_name =$2 WHERE email = $3`, [first_name, last_name, email])
            const user = await pool.query(`SELECT email, first_name,last_name,profile_image FROM users WHERE email = $1`, [email])
            res.status(200).json({
                status: 0,
                message: "Update Profile berhasil",
                data: user.rows
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updateImage(req, res, next) {
        try {
            const email = req.user.user;
            upload.single('image')(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({
                        status: 102,
                        message: "Multer Error",
                        data: null
                    });
                } else if (err) {
                    console.log(err)
                    return res.status(400).json({
                        status: 102,
                        message: "Format Image tidak sesuai",
                        data: null
                    });
                } 
                const file = req.file.filename;
                const imageUrl = `https://testnutech-production.up.railway.app/images/${file}`;
                await pool.query(`UPDATE users SET profile_image = $1 WHERE email = $2`, [file, email]);
                const user = await pool.query(`SELECT email, first_name, last_name, profile_image FROM users WHERE email = $1`, [email]);
                const responseData = {
                    email: user.rows[0].email,
                    first_name: user.rows[0].first_name,
                    last_name: user.rows[0].last_name,
                    profile_image: imageUrl
                };
                res.status(200).json({
                    status: 0,
                    message: "Update Profile Image berhasil",
                    data: responseData
                });
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}

module.exports = Controller