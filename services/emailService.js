
const nodemailer = require('nodemailer');
const { ValidationException } = require('../exception/exeption');
//let Email = require('../models/Email');

const sendEmail = async (correoDto, suscription) => {
    console.log("@sendEmail");
    try {

        const { para, cc, cco, asunto, html } = correoDto;

        if (para == undefined || para == '' || para == null) {
            console.log(" NO EXISTEN CORREOS EN NINGUN CONTENEDOR (para)");
            throw new ValidationException("el parametro para es requerido");
        }

        let _cc = cc ? cc : '';
        let _cco = cco ? cco : '';

        //let testAccount = await nodemailer.createTestAccount();     

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

        let sendingResponse = await transporter.sendMail(mailData);

        console.log("sendingResponse " + JSON.stringify(sendingResponse));

        transporter.close();

        return sendingResponse;

    } catch (error) {
        guardarLog("Error", correoDto, error);
        return new ValidationException(error);
    }
};

const sendEmailSync = (correoDto, suscription) => {
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
                guardarLog("Error ", new Email(asunto, para, cc, cco, html, suscription.id, error));
            } else {
                guardarLog("ENVIO - OK ", new Email(asunto, para, cc, cco, html, suscription.id));
            }
        });
       
        transporter.close();
      
    } catch (error) {
        guardarLog("Error", correoDto, error);
        return new ValidationException(error);
    }
};



const guardarLog = (action, emailObject, error) => {
    console.log(`${action} - ${JSON.stringify(emailObject)} ${error}`);
};



module.exports = { sendEmail,sendEmailSync };