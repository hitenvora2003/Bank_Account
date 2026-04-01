var express = require('express');
var router = express.Router();
const mw = require('../middleware/auth')
const ac = require('../controller/account')

/* GET users listing. */
router.post('/createdata',mw.authcheck,ac.createdata);
router.delete('/:deleteid',mw.authcheck,ac.deletedata);
router.patch('/:updateid',mw.authcheck,ac.updatedata);


module.exports = router;

