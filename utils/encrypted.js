const bcrypt = require('bcryptjs');

function encriptar(texto){
    return  bcrypt.hashSync(texto,8);    
}

module.exports = {  encriptar };