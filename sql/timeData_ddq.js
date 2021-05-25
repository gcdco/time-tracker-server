const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('timedb.db');
const data = require('./timeData');

db.serialize(function () {
    db.run("begin transaction");

    //(`client_id`,`title`,`created_at`)
    for (var i = 0; i < data.client_data.length; i++) {
        db.run("insert into Clients(client_id, title,created_at) values (?, ?, ?)", data.client_data[i][0], data.client_data[i][1], data.client_data[i][2]);
    }

    //(`project_id`,`title`,`description`,`created_at`,`active`,`client_id`)
    for (var i = 0; i < data.project_data.length; i++) {
        db.run("insert into Projects(project_id, title,description,created_at,active,client_id) values (?, ?, ?, ?, ?, ?)",
            data.project_data[i][0], data.project_data[i][1], data.project_data[i][2], data.project_data[i][3], data.project_data[i][4], data.project_data[i][5]);
    }

    //`Invoices` (`invoice_id`,`total`,`created_at`,`client_id`)
    for (var i = 0; i < data.invoice_data.length; i++) {
        db.run("insert into Invoices(invoice_id, total, created_at, client_id) values (?, ?, ?, ?)",
            data.invoice_data[i][0], data.invoice_data[i][1], data.invoice_data[i][2], data.invoice_data[i][3]);
    }

    // INSERT INTO `Tasks` (`task_id`,`description`,`time_duration`,`created_at`,`invoiced`,`invoice_id`,`project_id`)
    for (var i = 0; i < data.task_data.length; i++) {
        db.run("insert into Tasks(task_id,description,time_duration,created_at,invoiced,invoice_id,project_id) values (?, ?, ?, ?, ?, ?, ?)",
            data.task_data[i][0], data.task_data[i][1], data.task_data[i][2], data.task_data[i][3], data.task_data[i][4], data.task_data[i][5], data.task_data[i][6]);
    }

    // INSERT INTO `Tasks` (`task_id`,`description`,`time_duration`,`created_at`,`invoiced`,`project_id`)
    for (var i = 0; i < data.task_data_notInvoiced.length; i++) {
        db.run("insert into Tasks(task_id,description,time_duration,created_at,invoiced,project_id) values (?, ?, ?, ?, ?, ?)",
            data.task_data_notInvoiced[i][0], data.task_data_notInvoiced[i][1], data.task_data_notInvoiced[i][2], data.task_data_notInvoiced[i][3], data.task_data_notInvoiced[i][4], data.task_data_notInvoiced[i][5]);
    }

    db.run("commit");
});

db.close();