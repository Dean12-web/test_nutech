const pool = require ('../config/config.js')

class Controller {
    static async getAllBanner(req, res, next) {
        try {
            const data = await pool.query(`SELECT * FROM banners`);
            res.status(200).json({
                status: 0,
                message: "Sukses",
                data: data.rows
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    
}

module.exports = Controller