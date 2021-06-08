
const genericDao = require('./genericDao');

const getLog = async (apiKey) => {
    console.log("@getLog");
    try {
        let register = await genericDao
            .findAll(
                `SELECT l.* FROM LOG l inner join suscriptions s on s.id = l.suscriptions_id WHERE s.API_KEY = $1 AND s.ACTIVE`
                , [apiKey]
            );

        return register;
    } catch (e) {
        console.log("error in getLog " + error);
        return null;
    }
};


const saveLog = async (logDto) => {
    console.log("--------------------------------------");
     console.log("@saveLog "+JSON.stringify(logDto));
    try {

        let params = [
            logDto.suscription_id,
            logDto.type,
            logDto.emailDto.para,
            logDto.emailDto.cc || '',
            logDto.emailDto.cco || '',
            logDto.emailDto.html || '',
            logDto.validation_emails,            
            logDto.emailDto.status || ''
        ];
        console.log("PARAMS " + params);
        console.log("--------------------------------------");
        let logId =
            await genericDao
                .execute(`
                    INSERT INTO LOG(SUSCRIPTIONS_ID,TYPE,PARA,CC,CCO,HTML,VALIDATION_EMAILS,LOG) 
                    VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ID;
                `, params);
        console.log("GUARDADO EN DB "+logId);
        return logId;
    } catch (error) {
        console.log("Error in saveLog " + JSON.stringify(logDto) + " Error " + error);
        return null;
    }
}

module.exports = { getLog, saveLog };