
class SusciptionDto{

    constructor(){
        this.id;
        this.host;
        this.port;
        this.port;
        this.secureConnection;
        this.user;
        this.password;
        this.fromName;
        this.ciphers;
    }

    static builder = ()=>{
        return new SusciptionDto()
    }

    setId = (id = '')=>{
        this.id = id;
        return this;
    }
    
    setHost = (host = '') => {
        this.host = host;
        return this;
    }

    setPort = (port = '') => {
        this.port = port;
        return this;
    }

    setSecureConnection = (secureConnection = '') =>{
        this.secureConnection = secureConnection;
        return this;
    }

    setUser = (user = '') => {
        this.user = user;
        return this;
    }

    setPassword = (password = '')=>{
        this.password = password;
        return this;
    }

    setfromName = (fromName = '') => {
        this.fromName = fromName;
        return this;
    }

    setCiphers = (ciphers = '')=>{
        this.ciphers = ciphers;
        return this;
    }

    build() {
        return {
            id: this.id,
            host: this.host,
            port: this.port,
            secureConnection: this.secureConnection,
            auth: {
                user: this.user_name,
                pass: this.pass
            },
            tls : { ciphers:this.ciphers  },
            fromName: this.fromName
        }
    }
}

           
module.exports = SusciptionDto;