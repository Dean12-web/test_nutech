const pool = require ('../config/config.js')

class Controller {
    static async getAllServices(req,res,next){
        try {
            const data = await new Promise((resolve, reject) => {
                pool.query(`SELECT * FROM services`, function(err,data) {
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