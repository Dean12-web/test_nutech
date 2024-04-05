const express = require('express');
const router = express.Router();
const Controller = require('../controllers/banners_controller')

router.get('/', Controller.getAllBanner);

module.exports = router;