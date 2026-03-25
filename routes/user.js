var express = require('express');
var router = express.Router();
const uc = require('../controller/user')

/* GET users listing. */
router.post('/createdata',uc.createdata);
router.delete('/:deleteid',uc.deletedata);
router.post('/login',uc.login);

module.exports = router;
