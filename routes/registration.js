var express = require('express');
var router = express.Router();
const Controller = require('../controllers/users_controller')

router.post('/', Controller.postUsers);

module.exports = router;
