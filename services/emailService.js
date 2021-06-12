const logService = require('../services/logService');
let LogDto = require('../models/LogDto');
const { TYPE_ERROR } = require('../libs/constants');
const WrapperMailer = require('../libs/WrapperMailer');

const sendEmail = async (correoDto) => {
    try {

        await new WrapperMailer()
                    .withEmail(correoDto)
                    .sendEmail();

    } catch (error) {
        console.log("Error on sending email " +error);
        logService
            .save(
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