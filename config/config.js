const { Pool } = require('pg');
let pool
try {
    pool = new Pool({
        user: 'postgres',
        host: 'viaduct.proxy.rlwy.net',
        database: 'railway',
        port: 14281,
        password:'pMBPgDlfKOnBEoXoBwIChCxUxfSLlMiZ'
    });
    console.log('Connected to the database.');
} catch (error) {
    console.log('Error connecting to the database:', error.message);
}

module.exports = pool;
