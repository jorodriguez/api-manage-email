
const genericDao = require('./genericDao');

const getSuscription = async (apiKey) => {
    console.log("@getSuscription");
    let suscription;

    let register = await genericDao
        .findOne(
            `SELECT * FROM SUSCRIPTIONS WHERE API_KEY = $1 AND ACTIVE`
            , [apiKey]
        );
        console.log("Registro en db "+JSON.stringify(register));
    if (register) {
        suscription = {
            id:register.id,
            host: register.host,
            port: register.port,
            secureConnection: register.secureConnection,
            auth: {
                user: register.user_name,
                pass: register.pass
            },
            fromName : register.from_name
        }
        if (register.tls) {
            suscription.tls = {
                ciphers: register.ciphers
            }
        }
    }

    return suscription;

};


const crearCuentaModulo = (moduloDto) => {
    ///fixme create   
}

module.exports = { getSuscription };