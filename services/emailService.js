const nodemailer = require('nodemailer');
const emailExistence = require('email-existence');
const { ValidationException } = require('../exception/exeption');
const logDao = require('../dao/logDao');
let Email = require('../models/Email');
let Log = require('../models/Log');

const TYPE = { ERROR: "ERROR",ERROR_ON_SEND:"ERROR ON SEND", SEND_OK: "SEND_OK" };

const sendEmail = (correoDto, suscription) => {
    console.log("@sendEmail");
    try {

        const { para, cc, cco, asunto, html } = correoDto;

        /*if (para == undefined || para == '' || para == null) {
            console.log(" NO EXISTEN CORREOS EN NINGUN CONTENEDOR (para)");
            throw new ValidationException("el parametro para es requerido");
        }*/

        let _para = para ? deleteWhiteSpace(para) : '';
        let _cc = cc ? deleteWhiteSpace(cc) : '';
        let _cco = cco ? deleteWhiteSpace(cco) : '';

        const transporter = nodemailer.createTransport(suscription);

        const mailData = {
            from: suscription.fromName,
            to: _para,
            cc: _cc,
            cco: _cco,
            subject: asunto,
            html: html
        };

        console.log(`=>Sender FROM ${suscription.fromName}`);
        console.log("=>Correo para " + _para);
        console.log("=>Correo cc " + _cc);
        console.log("=>Asunto " + asunto);

        transporter.sendMail(mailData, function (error, info) {
            if (error) {
                saveValidationLog(TYPE.ERROR, new Email(asunto, _para, _cc, _cco, html, suscription.id, error));
            } else {
                saveValidationLog(TYPE.SEND_OK, new Email(asunto, _para, _cc, _cco, html, suscription.id, info));
            }
        });

        transporter.close();

    } catch (error) {
        console.log("Error on sending "+error);
        correoDto.status = {error:error,...correoDto.status};
        saveValidationLog(TYPE.ERROR_ON_SEND, correoDto);
        return new ValidationException(error);
    }
};

const saveValidationLog = async (logType, emailObject) => {
    console.log("@saveValidationLog");
    try {
        //console.log(`${logType} - ${JSON.stringify(emailObject)}`);

        let emails = `${emailObject.para}${emailObject.cc ? emailObject.cc : ''}${emailObject.cco ? emailObject.cco : ''}`;

        let emailsDontExist = await getDontExistEmail(emails);

        if ((emailsDontExist.length > 0) || logType == TYPE.ERROR || logType == TYPE.ERROR_ON_SEND) {

            let logDto = new Log(
                emailObject.suscription_id,
                logType,
                emailObject,
                emailsDontExist
            );

            logDao.saveLog(logDto);

        } else {
            console.log("Envio de correo  sin problemas <No se guarda nada> ");
        }

    } catch (error) {
        console.log("Error on save log" + error);
    }
};


const getDontExistEmail = async (email) => {
    console.log("@checkExistenceEmail " + email);
    try {

        let emailArray = email ? email.split(",") : [];
        let arrayError = [];
        let arrayPromise = [];

        //for ( let elementMail of emailArray ) {            
        /*let email = await checkMail(elementMail);
        if(!email.exist){
            arrayError.push(email);
        }*/
        //arrayPromise.push(checkMail(elementMail));
        // }

        //let arrayClear = emailArray.filter(e => e);

        emailArray.forEach(elementMail => {
            arrayPromise.push(checkMail(elementMail));
        });

        arrayError = await Promise.all(arrayPromise);

        return arrayError.filter(e => !e.exist);

    } catch (error) {
        console.log("error checkArrayEmail " + error);
        return null;
    }

}

const checkMail = (email) => {

    return new Promise((resolve, reject) => {
        try {
            if (!email) {
                
                resolve({ email: email, exist: false });

            } else {

                emailExistence.check(email, function (err, exist) {
                    console.log(`==> Check email ${email} exist? : ${exist} err ${err}`);
                    resolve({ email: email, exist: exist });
                });

            }
        } catch (error) {
            console.log("Error on checkMail " + error);
            reject(error);
        }
    });

}

const getLog = async (api_key) => {
    try {
        return logDao.getLog(api_key);
    } catch (error) {
        console.log("Error getLog " + error);
        return null;
    }
}


const deleteWhiteSpace = (str) => {
    return str ? str.replace(/\s+/g, "") : "";
}


module.exports = { sendEmail, getLog };