
const { ValidationException } = require('../exception/exeption');
const { pool } = require('../db/conection');

const findOne = async (query, params) => {
    console.log("@findOne " + JSON.stringify(params));
    try {

        if (!query || !params) {
            console.error("el query o los parametros son null " + query);
            return new ValidationException("La consulta es null");
        }

        let results = await pool.query(query, params);

        return results.rowCount > 0 ? results.rows[0] : null;
    } catch (error) {
        console.log("findOne error " + error);
        return null;
    }
};

const findAll = async (query, params) => {
    console.log("@findAll " + JSON.stringify(params));
    try {

        if (!query || !params) {
            console.error("el query o los parametros son null " + query);
            return new ValidationException("La consulta es null");
        }

        let results = await pool.query(query, params);

        return results.rows;
    } catch (error) {
        console.log("findAll error " + error);
        return null;
    }
};

const execute = async (query, params) => {
    console.log("@execute "+query);
    try {
        if (!query || !params) {
            console.error("el query o los parametros son null " + query);
            return new ValidationException("La consulta es null o parametros");
        }
        return await pool.query(query, params);
    } catch (error) {
        console.log("execute error => " + error);
        return null;
    }

};

module.exports = { findOne,findAll, execute };