const logDao = require('../dao/logDao');

const getAll = async (api_key) => {   
        
    return logDao.getAll(api_key);
    
};

const save = async (logDto) => {    
    try {               
          
         return logDao.save(logDto);
        
    } catch (error) {
        console.log("Error on save log" + error);
    }
};

module.exports = { getAll,save };