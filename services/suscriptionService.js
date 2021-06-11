const suscriptionDao = require('../dao/suscriptionDao');

const getSuscription = async(apiKey)=>{

    return await suscriptionDao.getSuscription(apiKey);
    
};

module.exports = { getSuscription };