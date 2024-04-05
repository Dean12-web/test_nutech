const { Pool } = require('pg');
let pool
try {
    pool = new Pool({
        user: 'Dean12',
        host: 'localhost',
        database: 'testnutech',
        port: 5432
    });
    console.log('Connected to the database.');
} catch (error) {
    console.log('Error connecting to the database:', error.message);
}

module.exports = pool;
