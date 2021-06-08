const nodemailer = require('nodemailer');
const emailExistence = require('email-existence');
const { ValidationException } = require('../exception/exeption');
const logDao = require('../dao/logDao');
let Email = require('../models/Email');
let Log = require('../models/Log');


const TYPE = { ERROR: "ERROR", SEND_OK: "SEND_OK" };

const sendEmail = (correoDto, suscription) => {
    console.log("@sendEmailSync");
    try {

        const { para, cc, cco, asunto, html } = correoDto;

        if (para == undefined || para == '' || para == null) {
            console.log(" NO EXISTEN CORREOS EN NINGUN CONTENEDOR (para)");
            throw new ValidationException("el parametro para es requerido");
        }

        let _cc = cc ? cc : '';
        let _cco = cco ? cco : '';

        const transporter = nodemailer.createTransport(suscription);

        const mailData = {
            from: suscription.fromName,
            to: para,
            cc: _cc,
            cco: _cco,
            subject: asunto,
            html: html
        };

        console.log(`=>Sender FROM ${suscription.fromName}`);
        console.log("=>Correo para " + para);
        console.log("=>Correo cc " + cc);
        console.log("=>Asunto " + asunto);

        transporter.sendMail(mailData, function (error, info) {
            if (error) {
                saveLog(TYPE.ERROR, new Email(asunto, para, cc, cco, html, suscription.id, error));
            } else {
                saveLog(TYPE.SEND_OK, new Email(asunto, para, cc, cco, html, suscription.id, info));
            }
        });

        transporter.close();
    } catch (error) {
        saveLog(TYPE.ERROR, correoDto, error);
        return new ValidationException(error);
    }
};

// 1. falta guardar en la base de datos el error
// 2. falta programar un endpoint para traer errores producidos por api_key
const saveLog = async (logType, emailObject) => {
    console.log("@saveLog");
    try {
        //console.log(`${logType} - ${JSON.stringify(emailObject)}`);

        let emails = `${emailObject.para}${emailObject.cc ? emailObject.cc : ''}${emailObject.cco ? emailObject.cco : ''}`;

        let emailsDontExist = await checkArrayEmail(emails);

        if (emailsDontExist || logType == TYPE.ERROR) {
            //guardar todo
            let logDto = new Log(
                emailObject.suscription_id,
                logType,
                emailObject,
                emailsDontExist
                );
            logDao.saveLog(logDto);

        } else {
            console.log("Envio sin problemas No se guarda nada ");
        }

    } catch (error) {
        console.log("Error on save log" + error);
    }
};


const checkArrayEmail = async (email) => {
    console.log("@checkExistenceEmail " + email)
    try {
        let emailArray = email ? email.split(",") : [];

        let arrayError = [];
        let arrayPromise = [];

        for  (let elementMail of emailArray) {
            arrayPromise.push(checkMail(elementMail));            
        }

         arrayError = await Promise.all(arrayPromise);

        console.log(" === "+JSON.stringify(arrayError));

        return arrayError;
    } catch (error) {
        console.log("error checkArrayEmail " + error);
        return null;
    }

}

const checkMail = (email) => {

    return new Promise((resolve, reject) => {
        try {
            emailExistence.check(email, function (err, exist) {
                console.log(`==> Check email ${email} exist? : ${exist} err ${err}`);
                resolve({ email: email, exist: exist });
            });
        } catch (error) {
            reject(error);
        }
    });

}



const getLog = async (api_key)=>{
    try{
        return logDao.getLog(api_key);
    }catch(error){
        console.log("Error getLog "+error);
        return null;
    }
}


module.exports = { sendEmail,getLog };