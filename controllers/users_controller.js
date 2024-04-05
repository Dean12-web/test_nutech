const pool = require ('../config/config.js')
const {hashPassword} = require('../helpers/utils.js')

class Controller {
    static async getUsers(req,res,next){
        try {
            const data = await new Promise((resolve, reject) => {
                pool.query(`SELECT * FROM users`, function(err,data) {
                    if(err){
                        reject(err)
                    }else{
                        resolve(data)
                    }
                });
            });
            res.json({
                status:0,
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
            const { email, first_name, last_name, password } = req.body;
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
    
}

module.exports = Controller