
const genericDao = require('./genericDao');
const SuscriptionDto = require('../models/SuscriptionDto');

const FIND_SUSCRIPTION_WHERE_APIKEY = `SELECT * FROM SUSCRIPTIONS WHERE API_KEY = $1 AND ACTIVE`;

const getSuscription = async (apiKey) => {
    let suscription;
    let register =
        await genericDao
            .findOne(FIND_SUSCRIPTION_WHERE_APIKEY, [apiKey]);

    if (register) {

        suscription =
            SuscriptionDto.builder()
                .setId(register.id)
                .setHost(register.host)
                .setPort(register.port)
                .setSecureConnection(register.secureconnection)
                .setUser(register.user_name)
                .setTls(register.tls)
                .setPassword(register.pass)
                .setfromName(register.from_name);

        if (register.tls) {

            suscription.setCiphers(register.ciphers);

        }
    }

    return suscription;

};

module.exports = { getSuscription };