var express = require('express');
var router = express.Router();

let invoice_controller = require('../controllers/invoiceController');

// get list of invoice
router.get('/', invoice_controller.invoice_list);

// get invoice details
router.get('/:id', invoice_controller.invoice_detail);

router.post('/email', invoice_controller.invoice_email);

module.exports = router;