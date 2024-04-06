const express = require('express');
const router = express.Router();
const Controller = require('../controllers/transaction_controller.js')
const {tokenValid} = require('../helpers/utils.js')

router.get('/',tokenValid,Controller.getBalance);

module.exports = router;