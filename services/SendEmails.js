
const nodemailer = require('nodemailer');
const suscriptionDao = require('../dao/suscriptionDao');
const { ValidationException } = require('../exception/exeption');
let Email = require('../models/Email');
/*
const transporter = nodemailer.createTransport(
    {
        "host": "magicintelligence.com",
        "port": 465,
        "secureConnection": false,
        "auth": {
            "user": "joel@magicintelligence.com",
            "pass": "x9F@*M2d5mi%%7a"
        },
        "tls": {
            "ciphers": "SSLv3"
        }
    }
);*/

const mailOptions = {
    from: "Test (PRUEBAS)<joel@magicintelligence.com>",
    cc: "joel@magicintelligence.com"
},

const enviarCorreo = (correoDto) => {

    const { para, cc, cco, asunto, renderHtml, apiKey } = correoDto;

    if (para == undefined || para == '' || para == null) {
        console.log(" NO EXISTEN CORREOS EN NINGUN CONTENEDOR (para)");
        throw new ValidationException("el parametro para es requerido");
    }
    if (cc == undefined || cc == '' || cc == null) {
        console.log(" NO EXISTEN CORREOS EN NINGUN CONTENEDOR (cc)");
        cc = '';
    }
    if (cco == undefined || cco == '' || cco == null) {
        console.log(" NO EXISTEN CORREOS EN NINGUN CONTENEDOR (cco)");
        cco = '';
    }

    const suscription = suscriptionDao.getSuscription(apiKey);

    if (suscription) {

        const transporter = nodemailer.createTransport(suscription);

        const mailData = {
            from: mailOptions.from,
            to: para,
            cc: cc,
            cco: cco,
            subject: asunto,
            html: renderHtml
        };
        console.log(`Sender FROM ${suscription.fromName}`);
        console.log("Correo para " + para);
        console.log("Correo cc " + cc);
        console.log("Asunto " + asunto);

        let retorno;

        transporter.sendMail(mailData, function (error, info) {
            if (error) {
                console.log("Error al enviar correo : " + error);
                retorno = new  Email(asunto,para,cc,cco,html,suscription.id);
            } else {
                console.log('CORREO ENVIADO ======>>>: ' + info.response);
                retorno = new  Email(asunto,para,cc,cco,html,suscription.id);
            }
        });
        transporter.close();   
        return retorno;     
    } else {
        console.log("No se envio el correo, no existe HTML");
        return ;
    }
}


module.exports = { enviarCorreo };