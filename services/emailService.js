const logService = require('../services/logService');
let LogDto = require('../models/LogDto');
const { TYPE_ERROR } = require('../libs/constants');
const WrapperMailer = require('../libs/WrapperMailer');

const sendEmail = (correoDto) => {
    try {

        WrapperMailer.instance.sendEmail(correoDto);

    } catch (error) {
        console.log("Error on sending " + error);
        logService
            .saveValidationLog(
                LogDto
                    .builder()
                    .setEmailDto(correoDto)
                    .setLog(error)
                    .setType(TYPE_ERROR.ERROR)
                    .build()
            );        
    }
};


module.exports = { sendEmail };