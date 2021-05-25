var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('timedb.db', err => {
    if (err) { return console.error(err.message); }
    console.log('Connected to the db database.');
});

db.serialize(function () {
    db.run("SELECT * FROM Clients");
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});