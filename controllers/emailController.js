const { ValidationException } = require('../exception/exeption');
const emailService = require('../services/emailService');
const suscriptionService = require('../services/suscriptionService');
const schemaValidationEmail = require('../utils/SchemaValidationEmail');
const { STATUS } = require('../utils/statusCode');
const { PROCESS_ACEPTED,APIKEY_NOT_VALID } = require('../utils/constants');
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



module.exports = { sendEmail };