const express = require('express');
const router = express.Router();
const Controller = require('../controllers/transaction_controller.js')
const {tokenValid} = require('../helpers/utils.js')

router.post('/',tokenValid, Controller.postTransaction);
router.get('/history', tokenValid, Controller.getTransactionHistory)
module.exports = router;