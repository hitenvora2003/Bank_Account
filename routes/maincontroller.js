var express = require('express');
var router = express.Router();
const mw = require('../middleware/auth')
const mc = require('../controller/maincontroller')

/* GET users listing. */
router.get('/',mw.authcheck,mc.getalldata);


module.exports = router;

