"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    database: 'ctown',
    user: 'postgres',
    password: '12345'
});
client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack);
    }
    else {
        console.log('connected');
    }
});
module.exports = client;
