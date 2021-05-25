var express = require('express');
var router = express.Router();

let project_controller = require('../controllers/projectController');

/* GET users listing. */
router.get('/', project_controller.project_list);

router.get('/:id', project_controller.project_detail);

router.post('/add', project_controller.project_add);

module.exports = router;