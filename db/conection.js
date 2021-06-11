const Pool = require('pg').Pool

const pool = new Pool({
    user:process.env.USER_DB || 'zaaceqivoaqhpu',
    host: process.env.HOST_DB || 'ec2-18-214-195-34.compute-1.amazonaws.com',
    database: process.env.DATABASE_NAME || 'd6k0an8bkvdfcd',
    password: process.env.PASSWORD_DB || '0fe54ea9e3417b7875bd692d304cba4690e1cd2361a9c68dc647d341745c452e',
    port: process.env.PORT_DB || 5432,    
    ssl: { rejectUnauthorized: false }
});


module.exports = {
    pool
};