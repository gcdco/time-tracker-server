const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('timedb.db');

// ADD THIS CODE BELOW
db.exec('PRAGMA foreign_keys = ON;', function (error) {
    if (error) {
        console.error("Pragma statement didn't work.")
    } else {
        console.log("Foreign Key Enforcement is on.")
    }
});


let clients_sql = `

CREATE TABLE IF NOT EXISTS Clients (
    client_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp
);

`;

let projects_sql = `
CREATE TABLE IF NOT EXISTS Projects (
    project_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    client_id INTEGER,
    FOREIGN KEY(client_id) REFERENCES Clients(client_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

`;

let invoices_sql = `
CREATE TABLE IF NOT EXISTS Invoices (
    invoice_id INTEGER PRIMARY KEY,
    total DECIMAL(9,2) NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    client_id INTEGER,
    FOREIGN KEY(client_id) REFERENCES Clients(client_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

`;

let tasks_sql = `
CREATE TABLE IF NOT EXISTS Tasks (
    task_id INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    time_duration INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    invoiced BOOLEAN NOT NULL DEFAULT false,
    invoice_id INTEGER,
    project_id INTEGER,
    FOREIGN KEY (invoice_id) REFERENCES Invoices(invoice_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

`;

let ProjectInvoices_sql = `
CREATE TABLE IF NOT EXISTS ProjectInvoices (
    project_id INTEGER NOT NULL,
    invoice_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, invoice_id),
    FOREIGN KEY(project_id) REFERENCES Projects(project_id) ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY(invoice_id) REFERENCES Invoices(invoice_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

`;

db.serialize(() => {

    db.run(clients_sql);
    db.run(projects_sql);
    db.run(invoices_sql);
    db.run(tasks_sql);
    db.run(ProjectInvoices_sql);
});


db.close();