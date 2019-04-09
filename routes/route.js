let express = require('express');
let router = express.Router();
let api = require('../api/api');

router.route('/isAlive')
    .get(api.checkServer)

module.exports = router;