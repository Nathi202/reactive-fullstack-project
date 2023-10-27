const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'my_local_psql_password',
  host: 'localhost',
  port: 5432,
  database: 'address_db'
});

module.exports = pool;
