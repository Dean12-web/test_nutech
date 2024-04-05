const express = require('express');
const router = express.Router();
const Controller = require('../controllers/services_controller')

router.get('/', Controller.getAllServices);

module.exports = router