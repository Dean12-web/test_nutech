var express = require('express');
var router = express.Router();
const Controller = require('../controllers/users_controller')

router.get('/', Controller.getUsers);

module.exports = router;