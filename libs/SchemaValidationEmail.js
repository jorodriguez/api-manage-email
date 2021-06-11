
const Joi = require('joi');

//const RULE_EMAIL_VALIDATION = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };

module.exports = class SchemaValidationEmail {

    static instance = new SchemaEmail();

    validation = schemaBody = Joi.object({
        asunto: Joi.string().optional().allow(""),
        para: Joi.string().optional().allow(""),
        cc: Joi.string().optional().allow(""),
        cco: Joi.string().optional().allow(""),
        html: Joi.string(),
        api_key: Joi.string().required()
    });

}

