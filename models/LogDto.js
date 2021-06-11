

class LogDto {

    constructor(suscription_id,type,emailDto,validation_emails) {
        this.suscription_id = suscription_id;
        this.type = type;        
        this.emailDto = emailDto;
        this.validation_emails = validation_emails;       

    }
}


module.exports = LogDto ;