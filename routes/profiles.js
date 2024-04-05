var express = require('express');
var router = express.Router();
const Controller = require('../controllers/users_controller')
const {tokenValid} = require('../helpers/utils.js')

router.get('/', tokenValid, Controller.getUsers);
router.put('/update',tokenValid, Controller.updateUsers);

module.exports = router;