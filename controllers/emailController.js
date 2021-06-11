const { ValidationException } = require('../exception/exeption');
const emailService = require('../services/emailService');
const suscriptionService = require('../services/suscriptionService');
const { schemaValidationEmail } = require('../libs/SchemaValidationEmail');
const { STATUS } = require('../libs/statusCode');
const { PROCESS_ACEPTED } = require('../libs/constants');

const sendEmail = async (request, response) => {
     
    const body = { email } = request.body;

    try {
        await schemaValidationEmail.validateAsync(body);

        const suscription = await suscriptionService.getSuscription(body.api_key);
        
        if ( suscription ) {
            
            emailService.sendEmail( body, suscription );

        } else {

            returning = new ValidationException("Se requiere un api key válida.");

        }
        
        response.status(STATUS.OK).json(PROCESS_ACEPTED);

    } catch (error) {
        
        console.log("Exception in sendEmail controller " + error);
        
        response.status(STATUS.UNAUTHORIZED).json(new ValidationException(error.details));
    
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