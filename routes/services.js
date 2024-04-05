const express = require('express');
const router = express.Router();
const Controller = require('../controllers/services_controller');
const {tokenValid} = require('../helpers/utils.js')

router.get('/', tokenValid, Controller.getAllServices);

module.exports = router