const Pool = require('pg').Pool
const dotenv = require('dotenv');
dotenv.config();

//Nuevos parametros a la DB
/*
const dbParams = {
   user: 'zaaceqivoaqhpu',
    host: 'ec2-18-214-195-34.compute-1.amazonaws.com',
    database: 'd6k0an8bkvdfcd',
    password: '0fe54ea9e3417b7875bd692d304cba4690e1cd2361a9c68dc647d341745c452e',
    port: 5432,
    ssl: { rejectUnauthorized: false }
};
*/


const pool = new Pool({
    user:process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,    
    ssl: true
});


module.exports = {
    pool
};