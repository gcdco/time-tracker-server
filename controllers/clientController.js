const path = require('path');
const dbPath = path.resolve(__dirname, '..', 'sql', 'timedb.db');
console.log(__dirname);
console.log(dbPath);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, err => {
    if (err) { return console.error(err.message); }
    console.log('Connected to the db database.');
});

exports.client_list = function (req, res) {
    let sql = `SELECT * FROM Clients;`;

    db.serialize(function () {
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });

    });
};

// clients/:id
exports.client_detail = function (req, res, next) {
    res.send('return client information id: ' + req.params.id);
};
