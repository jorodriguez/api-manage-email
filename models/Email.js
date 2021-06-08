

class Email {

    constructor(asunto,para,cc,cco,html,suscription_id,status) {
        this.asunto = asunto;
        this.para = para
        this.cc = cc;
        this.cco = cco;
        this.html = html;
        this.suscription_id = suscription_id;
        this.status = status;
    }   
}


module.exports = Email ;