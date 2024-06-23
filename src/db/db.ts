import { Client } from "pg";

const client : Client = new Client({
    host: 'localhost',
    port:  5432,
    database: 'ctown',
    user: 'postgres',
    password: '12345'
});

client.connect((err)  => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
    }
});

module.exports = client;