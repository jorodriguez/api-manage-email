

class Email {

    constructor(asunto,para,cc,cco,html,module,error) {
        this.asunto = asunto;
        this.correos = para
        this.cc = cc;
        this.cco = cco;
        this.html = html;
        this.module = module;
        this.error = error;
    }   
}


module.exports = Email ;