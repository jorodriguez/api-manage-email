
const nodemailer = require('nodemailer');
const { ValidationException } = require('../exception/exeption');
let Email = require('../models/Email');

const sendEmail = (correoDto, suscription) => {
    console.log("@sendEmail" + JSON.stringify(correoDto));
    try {

        const { para, cc, cco, asunto, html } = correoDto;

        if (para == undefined || para == '' || para == null) {
            console.log(" NO EXISTEN CORREOS EN NINGUN CONTENEDOR (para)");
            throw new ValidationException("el parametro para es requerido");
        }

        let _cc = cc ? cc : '';
        let _cco = cco ? cco : '';
        
        console.log("suscription " + JSON.stringify(suscription));

        const transporter = nodemailer.createTransport(suscription);

        const mailData = {
            from: suscription.fromName,
            to: para,
            cc: _cc,
            cco: _cco,
            subject: asunto,
            html: html
        };
        console.log(`Sender FROM ${suscription.fromName}`);
        console.log("Correo para " + para);
        console.log("Correo cc " + cc);
        console.log("Asunto " + asunto);

        transporter.sendMail(mailData, function (error, info) {            
            if (error) {
                guardarLog("Error ",new Email(asunto, para, cc, cco, html, suscription.id, error));                                
            } else {
                guardarLog("ENVIO - OK ",new Email(asunto, para, cc, cco, html, suscription.idr));                                                                
            }
        });
        transporter.close();        
    
    } catch (error) {
        
    }
};


const guardarLog = (action,emailObject)=>{
    console.log(`${action} - ${JSON.stringify(emailObject)}`);        
};


module.exports = { sendEmail };