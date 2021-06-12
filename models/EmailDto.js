
const { deleteWhiteSpace } = require('../libs/Utils');
const {ValidationException } = require('../exception/exeption');
 
class EmailDto {

    //constructor(asunto,para,cc,cco,html,suscription_id,status) {
    constructor(){
        this.asunto;
        this.para;
        this.cc;
        this.cco;
        this.html;
        this.suscription;
        this.status;
    }   

    setAsunto(asunto = ''){
        this.asunto = asunto;
        return this;
    }

    setPara(para = ''){
        this.para = para;
        return this;
     };

     setCc(cc = ''){
         this.cc = cc;
         return this;
     }
    
     setCco(cco = ''){
         this.cco = cco;
         return this;
     }

     setHtml(html = ''){
         this.html = html;
         return this;
     }

     setSuscription(suscription = null ){
        this.suscription = suscription;
        return this;
     }

     static builder(){
        return new EmailDto();
     }

     buildEmailData() {
         
         if(!this.suscription){
             throw new ValidationException("the suscription is required on emailDto");
         }

        return {
            from : this.suscription.fromName,
            to : deleteWhiteSpace(this.para),
            cc : deleteWhiteSpace(this.cc),
            cco : deleteWhiteSpace(this.cco),
            subject : this.asunto,
            html : this.html
        };
    }
}

module.exports = EmailDto;


