const { ValidationException } = require('../exception/exeption');
const emailService = require('../services/emailService');
const suscriptionService = require('../services/suscriptionService');
const Joi = require('joi');
const moment = require('moment');

let RULE_EMAIL_VALIDATION = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };

const schemaBody = Joi.object({
    para: Joi.string().required(),
    asunto: Joi.string(),
    cc: Joi.string().email(RULE_EMAIL_VALIDATION).optional().allow(''),
    cco: Joi.string().email(RULE_EMAIL_VALIDATION).optional().allow(''),
    html: Joi.string().required(),
    async: Joi.bool().optional(),
    api_key: Joi.string().required()
});

const sendEmail = async (request, response) => {
    console.log("@sendEmail");
    const body = { email } = request.body;

    try {
        await schemaBody.validateAsync(body);

        const suscription = await suscriptionService.getSuscription(body.api_key);

        let returning = { process: true };

        if (suscription) {
            //returning = await emailService.sendEmail(body, suscription);           
            emailService.sendEmail(body, suscription);
        } else {
            returning = new ValidationException("Se requiere un api key válida.");
        }
        response.status(200).json(returning);

        console.log("===|___________________|===");
        console.log("===| Final del proceso |===");
        console.log("===|̣̣̣-------------------|===");
    } catch (e) {
        console.log("Exception in sendEmail controller " + e);
        response.status(401).json(new ValidationException(e.details));
    }
};


const getLogFails = async (request, response) => {
    console.log("@getLogFails ");
    const body = { api_key } = request.body;

    try {
        let returning = { process: true };

        if(!api_key){
            returning = new ValidationException("Se requiere un api key válida.");
            response.status(200).json(returning);
        }

        const suscription = await suscriptionService.getSuscription(api_key);       

        if (suscription) {            
            returning = await emailService.getLog(api_key);
        } else {
            returning = new ValidationException("Se requiere un api key válida.");
        }

        response.status(200).json(returning);

    } catch (e) {
        console.log("Exception in sendEmail controller " + e);
        response.status(401).json(new ValidationException(e.details));
    }
};


module.exports = { sendEmail,getLogFails };