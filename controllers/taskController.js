const path = require('path')
const dbPath = path.resolve(__dirname, '..', 'sql', 'timedb.db')
console.log(__dirname);
console.log(dbPath);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, err => {
    if (err) { return console.error(err.message); }
    console.log('Connected to the db database.');
});

// project/:id
exports.task_list = function (req, res) {
    let id = req.params.id;
    let task_sql = `SELECT * FROM Tasks WHERE project_id=?;`;

    db.serialize(function () {
        const data = {};
        db.all(task_sql, [id], (err, rows) => {
            if (err) {
                throw err;
            }
            data.tasks = rows;
            //data.push(rows)
            console.log(data)
            //res.json(data);
        });

        //SELECT * from Clients where client_id=(SELECT client_id FROM Invoices WHERE invoice_id=1)
        let project_sql = `SELECT * from Projects where project_id=?`
        db.get(project_sql, [id], (err, row) => {
            data.project = row;
            //console.log(data);
            res.json(data);
        });
        // let date_sql = `SELECT created_at from Invoices where invoice_id=?`
        // db.get(date_sql, [id], (err, row) => {
        //     data.date = row;
        //     console.log(data);
        //     res.json(data);
        // });
    });
};


// exports.task_detail = function (req, res, next) {
//     res.send('return invoice information id: ' + req.params.id)
// };

// project/:id
exports.task_add = function (req, res) {
    const time = req.body.time;
    const desc = req.body.description;
    const projectID = req.body.project_id;
    console.log(req.body);
    db.serialize(function () {
        // insert one row into the langs table
        db.run(`INSERT INTO Tasks(description, time_duration, project_id) VALUES(?,?,?)`, [desc, time, projectID], function (err) {
            if (err) {
                return console.log(err.message);
            }
        });

    });
    // res.send('add a project: ' + req.params.id);
};


exports.task_update = function (req, res) {
    const time = req.body.time;
    const desc = req.body.description;
    const taskID = req.params.task_id;
    console.log(time);
    console.log(desc);
    console.log(taskID);

    const update_sql = `UPDATE Tasks SET time_duration=?, description=? WHERE task_id=?`;

    db.serialize(function () {
        // insert one row into the langs table
        db.run(update_sql, [time, desc, taskID], function (err) {
            if (err) {
                return console.log(err.message);
            }
        });
        res.sendStatus(200);
    });
};

exports.task_delete = function (req, res) {
    const taskID = req.params.task_id;
    const delete_sql = `DELETE FROM Tasks WHERE task_id=?`;
    db.serialize(function () {
        db.run(delete_sql, [taskID], function (err) {
            if (err) {
                return console.log(err.message);
            }
        });
        res.sendStatus(200);
    });
};