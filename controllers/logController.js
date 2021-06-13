const { ValidationException } = require('../exception/exeption');
const logService = require('../services/logService');
const suscriptionService = require('../services/suscriptionService');
const { STATUS } = require('../utils/statusCode');
const { APIKEY_NOT_VALID } = require('../utils/constants');

const getLogs = async (request, response) => {

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
        console.log("Error getLogs "+exception);
        response.status(STATUS.CONFLICT).json(new ValidationException(exception));
    }
};


module.exports = { getLogs };