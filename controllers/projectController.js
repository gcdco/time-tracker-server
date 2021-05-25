const path = require('path')
const dbPath = path.resolve(__dirname, '..', 'sql', 'timedb.db')
console.log(__dirname);
console.log(dbPath);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, err => {
    if (err) { return console.error(err.message); }
    console.log('Connected to the db database.');
});

// List all projects
exports.project_list = function (req, res) {
    let sql = `SELECT * FROM Projects;`;

    db.serialize(function () {
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });

    });
    // close the database connection
    //db.close();
};

// project/:id
exports.project_detail = function (req, res, next) {
    res.send('return project information id: ' + req.params.id)
};

exports.project_add = function (req, res, next) {
    const title = req.body.title;
    const desc = req.body.desc;
    const client = req.body.client;
    console.log(req.body);
    db.serialize(function () {
        // insert one row into the langs table
        db.run(`INSERT INTO Projects(title, client_id, description) VALUES(?,?,?)`, [title, client, desc], function (err) {
            if (err) {
                return console.log(err.message);
            }
            //res.send();
        });

    });

};
