const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('timedb.db');
const data = require('./timeData');

db.serialize(function () {
    db.run("begin transaction");

    // INSERT INTO `Tasks` (`task_id`,`description`,`time_duration`,`created_at`,`invoiced`,`project_id`)
    for (var i = 0; i < data.task_data_notInvoiced.length; i++) {
        db.run("insert into Tasks(task_id,description,time_duration,created_at,invoiced,project_id) values (?, ?, ?, ?, ?, ?)",
            data.task_data_notInvoiced[i][0], data.task_data_notInvoiced[i][1], data.task_data_notInvoiced[i][2], data.task_data_notInvoiced[i][3], data.task_data_notInvoiced[i][4], data.task_data_notInvoiced[i][5]);
    }

    db.run("commit");
});

db.close();