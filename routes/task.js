var express = require('express');
var router = express.Router();

let task_controller = require('../controllers/taskController');

// get list of invoice
//router.get('/', task_controller.task_list);


// get task list for projects
router.get('/:id', task_controller.task_list);

router.post('/add/:id', task_controller.task_add);

module.exports = router;

