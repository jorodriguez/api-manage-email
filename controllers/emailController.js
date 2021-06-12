const { ValidationException } = require('../exception/exeption');
const emailService = require('../services/emailService');
const logService = require('../services/logService');
const suscriptionService = require('../services/suscriptionService');
const schemaValidationEmail = require('../libs/SchemaValidationEmail');
const { STATUS } = require('../libs/statusCode');
const { PROCESS_ACEPTED,APIKEY_NOT_VALID } = require('../libs/constants');
let EmailDto = require('../models/EmailDto');


const sendEmail = async (request, response) => {

    console.log(JSON.stringify(request.body));

    const body = { para, cc, cco, asunto, html, api_key } = request.body;

    try {
        await schemaValidationEmail.getSchemaBody().validateAsync(body);

        const suscription = await suscriptionService.getSuscription(api_key);

        if (suscription) {

            let emailDto = EmailDto
                .builder()
                .setPara(para)
                .setCc(cc)
                .setCco(cco)
                .setAsunto(asunto)
                .setHtml(html)
                .setSuscription(suscription);

            emailService.sendEmail(emailDto);

        } else {

            returning = new ValidationException("Se requiere un api key válida.");

        }

        console.log("======RESPUESTA====="+JSON.stringify(PROCESS_ACEPTED));
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
        let returning;

        if (!api_key) {
            
            response.status(STATUS.UNAUTHORIZED).json(new ValidationException(APIKEY_NOT_VALID));
            
        }

        const suscription = await suscriptionService.getSuscription(api_key);

        if (suscription) {
            returning = await logService.getAll(api_key);
        } else {
            returning = new ValidationException(APIKEY_NOT_VALID);
        }

        response.status(STATUS.OK).json(returning);

    } catch (exception) {
      
        response.status(STATUS.CONFLICT).json(new ValidationException(exception));
    }
};


module.exports = { sendEmail, getLogFails };