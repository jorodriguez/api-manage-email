const nodemailer = require('nodemailer');
const { ValidationException } = require('../exception/exeption');

class WrapperMailer {

    constructor() {
        this.emailDto;
    }

    withEmail(emailDto) {
        this.emailDto = emailDto;
        return this;
    }

    async sendEmail() {

        let transporter;

        try {

            if (!this.emailDto || !this.emailDto.suscription) {
                throw new ValidationException("Suscription and email are required ");
            }

            transporter =
                nodemailer
                    .createTransport(
                        this.emailDto.suscription.build()
                    );

            await transporter.sendMail(this.emailDto.buildEmailData());

        } finally {
            transporter.close()
        }
    }

}

module.exports = WrapperMailer;