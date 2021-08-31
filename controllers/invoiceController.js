const axios = require('axios');
const path = require('path');
const dbPath = path.resolve(__dirname, '..', 'sql', 'timedb.db');
console.log(__dirname);
console.log(dbPath);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, err => {
    if (err) { return console.error(err.message); }
    console.log('Connected to the db database.');
});

// List all invoices
exports.invoice_list = function (req, res) {
    let sql = `SELECT * FROM Invoices;`;

    db.serialize(function () {
        db.all(`SELECT * FROM Invoices;`, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row);
            });
            res.json(rows);
        });

    });
};

//http://localhost:4000/invoice/1
// project/:id
exports.invoice_detail = function (req, res, next) {
    let id = req.params.id;
    let task_sql = `SELECT * FROM Tasks WHERE invoice_id=?;`;

    db.serialize(function () {
        const data = {};
        db.all(task_sql, [id], (err, rows) => {
            if (err) {
                throw err;
            }
            data.tasks = rows;
        });

        //SELECT * from Clients where client_id=(SELECT client_id FROM Invoices WHERE invoice_id=1)
        let client_sql = `SELECT * from Clients where client_id=(SELECT client_id FROM Invoices WHERE invoice_id=?)`;
        db.get(client_sql, [id], (err, row) => {
            data.client = row;
        });
        let date_sql = `SELECT created_at from Invoices where invoice_id=?`;
        db.get(date_sql, [id], (err, row) => {
            data.date = row;
            console.log(data);
            res.json(data);
        });
    });
};

//invoice_email
exports.invoice_email = function (req, res, next) {
    const url = `http://flip1.engr.oregonstate.edu:9584/`;
    let recipient = req.body.recipient;
    let senderName = req.body.senderName;
    let senderEmail = req.body.senderEmail;
    let subject = req.body.subject;
    let text = req.body.text;
    let html = req.body.html;

    axios.post(url, {
        "recipient": recipient,
        "senderName": senderName,
        "senderEmail": senderEmail,
        "subject": subject,
        "text": text,
        "html": html
    });
};
