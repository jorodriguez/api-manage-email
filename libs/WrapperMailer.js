const nodemailer = require('nodemailer');

class WrapperMailer {

    static instance = new WrapperMailer();
    
    sendEmail = (emailDto) =>{
       
        let transporter = nodemailer.createTransport(emailDto.suscription);

        const mailData = emailDto.build();

        transporter.sendMail(mailData, function (error, info) {
            if (error) {
               throw error;
            }
        });
        transporter.close();        
    }

}


module.exports = WrapperMailer;