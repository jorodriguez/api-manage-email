const { SAL_SECRET_DEFAULT, EXPIRED_TIME } = require('../libs/constantes');
const Token = require('../models/Email');
const jwt = require('jsonwebtoken');
const { ValidationException } = require('../exception/exeption');
const Joi = require('joi');
const moment = require('moment');

//schema validation
const schemaBody = Joi.object({
    user: Joi.any().required(),
    expiredIn: Joi.string()
});

const create = async (request, response) => {

    let body = { user, expiredIn } = request.body;
    try {
        await schemaBody.validateAsync(body);

        let _salt = process.env.SAL_SECRET_DEFAULT || SAL_SECRET_DEFAULT;

        let _expiredIn = expiredIn || (process.env.EXPIRED_TIME || EXPIRED_TIME);

        let token = jwt.sign(
            { data: user },
            _salt,
            { expiresIn: `${_expiredIn}` }
        );

        let respuesta = new Token(user, token, _expiredIn);

        response.status(200).json(respuesta);

    } catch (e) {
        console.log("Exception " + e);
        response.status(401).json(new ValidationException(e.details));
    }
};

const verify = (request, response) => {
    const token = request.header('auth-token');

    if (!token) return response.status(401).json(new ValidationException('token dont exist'));

    try {
        let _salt = process.env.SAL_SECRET_DEFAULT || SAL_SECRET_DEFAULT;

        const verified = jwt.verify(token, _salt)

        let dateExp = new Date(verified.exp * 1000);

        let expMoment = moment(dateExp.toUTCString());

        let expiredIn = moment.duration(expMoment.diff(moment()));

        console.log(`expiredIn ${expiredIn.humanize()}`);

        response.status(200).json({ valid: true, ...verified, expiredInMinutes: expiredIn.asMinutes() });
    } catch (error) {
        console.log("Excepcion " + error);
        response.status(400).json({ valid: false, error: error });
    }
}


module.exports = { create, verify };