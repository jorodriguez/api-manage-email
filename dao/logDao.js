
const genericDao = require('./genericDao');

const getAll = async (apiKey) => {
    try {
        let register = await genericDao
            .findAll(
                `SELECT l.* FROM LOG l inner join suscriptions s on s.id = l.suscriptions_id WHERE s.API_KEY = $1 AND s.ACTIVE`
                , [apiKey]
            );

        return register;
    } catch (error) {
        console.log("error in getLog " + error);
        return null;
    }
};


const save = async (logDto) => {
    
    try {

        let wrapLog = (typeof logDto.log) == 'string' ? `${logDto.log}` : JSON.stringify(logDto.log);

        let params = [
            logDto.suscriptionId,
            logDto.type,
            logDto.emailDto.para,
            logDto.emailDto.cc || '',
            logDto.emailDto.cco || '',
            logDto.emailDto.html || '',
            JSON.stringify(logDto.validation_emails),
            wrapLog || ''
        ];

        console.log("PARAMS " + params  );

        let returning =
            await genericDao
                .execute(`
                    INSERT INTO LOG(SUSCRIPTIONS_ID,TYPE,PARA,CC,CCO,HTML,VALIDATION_EMAILS,LOG) 
                    VALUES($1,$2,$3,$4,$5,$6,$7::text,$8) RETURNING ID;
                `, params);

        return (returning.rowCount > 1) ? returning.rows[0] : null;
    } catch (error) {
        console.log("Error in saveLog " + JSON.stringify(logDto) + " Error " + error);
        return null;
    }
}

module.exports = { getAll, save };