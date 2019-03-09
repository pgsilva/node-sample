let express = require('express');
let router = express.Router();
let api = require('../api/apiUser');

router.route('/users')
      .get(api.listUsers)
      .post()
      .put()
      .delete();

module.exports = router;