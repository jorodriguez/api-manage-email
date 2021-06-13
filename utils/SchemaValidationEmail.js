
const Joi = require('joi');

//const RULE_EMAIL_VALIDATION = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };

class SchemaValidationEmail {

    constructor() {

        this.schemaBody = Joi.object({
            asunto: Joi.string().optional().allow(""),
            para: Joi.string().optional().allow(""),
            cc: Joi.string().optional().allow(""),
            cco: Joi.string().optional().allow(""),
            html: Joi.string(),
            api_key: Joi.string().required()
        });

    }

     getSchemaBody() {
        return this.schemaBody;
    }

}


module.exports = new SchemaValidationEmail();

