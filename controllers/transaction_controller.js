const pool = require('../config/config.js')
const cuid = require('cuid');

class Controller {
    static async getBalance(req, res, next) {
        try {
            const email = req.user.user
            const user = await pool.query(`SELECT balance FROM users WHERE email = $1`, [email])
            return res.status(200).json({
                status: 0,
                message: "Get Balance Berhasil",
                data: user.rows
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async postTopUp(req, res, next) {
        try {
            const email = req.user.user;
            const {
                top_up_amount
            } = req.body;
            const invoice_number = cuid();
            const transaction_type = 'TOPUP';
            const description = 'Top up balance';
            const amountRegex = /^\d+$/;
            if (!amountRegex.test(top_up_amount) || top_up_amount < 0) {
                return res.status(400).json({
                    status: 102,
                    message: "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
                    data: null
                });
            }
            await pool.query(`UPDATE users SET balance = balance + $1 WHERE email = $2`, [top_up_amount, email]);
            const user = await pool.query(`SELECT balance FROM users WHERE email = $1`, [email]);
            await pool.query(`INSERT INTO transactions(invoice_number, transaction_type, email, total_amount, description) 
                                VALUES($1, $2, $3, $4, $5)`, [invoice_number, transaction_type, email, top_up_amount, description]);
            return res.status(200).json({
                status: 0,
                message: "Top Up Balance berhasil",
                data: user.rows
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async postTransaction(req, res, next) {
        try {
            const {
                service_code
            } = req.body;
            const invoice_number = cuid();
            const email = req.user.user;
            const user = await pool.query(`SELECT balance FROM users WHERE email = $1`, [email]);
            const services = await pool.query(`SELECT * FROM services WHERE service_code = $1`, [service_code]);
            const balanceUser = user.rows[0].balance;
            const service_tarif = services.rows[0].service_tarif;
            const service_name = services.rows[0].service_name;
            const transaction_type = 'PAYMENT';
            const created_on = new Date()
            if (services.rows.length === 0) {
                return res.status(400).json({
                    status: 102,
                    message: "Service atau Layanan tidak ditemukan",
                    data: null
                });
            }
            if (balanceUser < service_tarif) {
                return res.status(400).json({
                    status: 102,
                    message: "Balance tidak mencukupi, lakukan topup",
                    data: null
                });
            }
            await pool.query(`UPDATE users SET balance = balance - $1 WHERE email = $2`, [service_tarif, email])
            await pool.query(`INSERT INTO transactions(invoice_number, transaction_type, email, total_amount, description) 
                                VALUES($1, $2, $3, $4, $5)`, [invoice_number, transaction_type, email, service_tarif, service_name]);

            return res.status(200).json({
                status: 0,
                message: "Transaksi berhasil",
                data: {
                    invoice_number,
                    service_code,
                    service_name,
                    transaction_type,
                    service_tarif,
                    created_on
                }
            });
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getTransactionHistory(req, res, next) {
        const email = req.user.user
        const {
            limit,
            offset
        } = req.query
        if (!limit) {
            delete req.query.limit;
        }
        const {
            rows
        } = await pool.query(`SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions 
                        WHERE email = $1 ORDER BY created_on DESC LIMIT $2 OFFSET $3`, [email, limit, offset])
        if (rows.length === 0) {
            return res.status(404).json({
                status: 102,
                message: "Belum ada transaksi",
                data: null
            });
        }
        return res.status(200).json({
            status: 0,
            message: "Get History Berhasil",
            data: {
                offset,
                limit,
                records: rows
            }
        });
    }
}

module.exports = Controller