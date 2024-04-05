const {Pool} = require('pg')

const pool = new Pool({
    user : 'Dean12',
    host : 'localhost',
    database: 'testnutech',
    port:5432
})

module.exports = pool