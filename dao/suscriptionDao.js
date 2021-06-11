
const genericDao = require('./genericDao');
const SusciptionDto = require('../models/SuscriptionDto');

const getSuscription = async (apiKey) => {
    console.log("@getSuscription");
    let suscription;

    let register = await genericDao
        .findOne(
            `SELECT * FROM SUSCRIPTIONS WHERE API_KEY = $1 AND ACTIVE`
            , [apiKey]
        );

    console.log("Registro en db " + JSON.stringify(register));

    if (register) {

        suscription =
            SusciptionDto.builder()
                .setId(register.id)
                .setHost(register.host)
                .setPort(register.port)
                .setSecureConnection(register.secureConnection)
                .setUser(register.user_name)
                .setPassword(register.pass)
                .setfromName(register.fromName);

        if (register.tls) {

            suscription.setCiphers(register.ciphers);

        }
    }

    return suscription;

};

module.exports = { getSuscription };