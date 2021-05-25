var express = require('express');
var router = express.Router();

let client_controller = require('../controllers/clientController');

// get list of clients
router.get('/', client_controller.client_list);

// get client details
router.get('/:id', client_controller.client_detail);

module.exports = router;