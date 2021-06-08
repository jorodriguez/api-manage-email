const { ValidationException } = require('../exception/exeption');
const emailService = require('../services/emailService');
const suscriptionService = require('../services/suscriptionService');
const Joi = require('joi');
const moment = require('moment');

let RULE_EMAIL_VALIDATION = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };

const schemaBody = Joi.object({    
    asunto: Joi.string().optional().allow(""),
    para: Joi.string().optional().allow(""),
    cc: Joi.string().optional().allow(""),
    cco: Joi.string().optional().allow(""),
    html: Joi.string(),    
    api_key: Joi.string().required()
});

const sendEmail = async (request, response) => {
    console.log("@sendEmail");
 
    const body = { email } = request.body;

    try {
        await schemaBody.validateAsync(body);

        const suscription = await suscriptionService.getSuscription(body.api_key);

        let returning = { process: true };

        if ( suscription ) {
            
            emailService.sendEmail( body, suscription );

        } else {

            returning = new ValidationException("Se requiere un api key válida.");

        }
        
        response.status(200).json(returning);

        console.log("===|___________________|===");
        console.log("===| Final del proceso |===");
        console.log("===|̣̣̣-------------------|===");

    } catch (error) {
        
        console.log("Exception in sendEmail controller " + error);
        
        response.status(401).json(new ValidationException(error.details));
    
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