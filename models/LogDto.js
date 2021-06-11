

class LogDto {

    constructor() {
        this.suscriptionId;
        this.type;
        this.emailDto; 
        this.log;       
    }
    
    setType(type = ''){
        this.type = type;
        return this;
    }

    setEmailDto(emailDto = null){        
        this.emailDto = emailDto;
        if(emailDto){
            this.suscriptionId = emailDto.suscription.id;
        }
        
        return this;
    }

    setLog(log = ''){
        this.log = log;
        return this;
    }

    static builder(){return new LogDto();}

    build() {
        return this;
    }


}


module.exports = LogDto;