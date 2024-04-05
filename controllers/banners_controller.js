const pool = require ('../config/config.js')

class Controller {
    static async getAllBanner(req,res,next){
        try {
            const data = await new Promise((resolve, reject) => {
                pool.query(`SELECT * FROM banners`, function(err,data) {
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
}

module.exports = Controller