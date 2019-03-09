let express = require('express');
let router = express.Router();
let api = require('./api/apiUser');

router.get('/users', api.listUsers);

module.exports = router;