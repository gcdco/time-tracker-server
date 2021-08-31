var express = require('express');
var router = express.Router();

let task_controller = require('../controllers/taskController');

// get task list for projects
router.get('/:id', task_controller.task_list);
router.post('/add/:id', task_controller.task_add);
router.post('/update/:task_id', task_controller.task_update);
router.post('/delete/:task_id', task_controller.task_delete);

module.exports = router;
