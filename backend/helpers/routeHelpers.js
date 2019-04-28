// Capital J as what is returned from this module is a class and classes need to be uppercase
// Joi helps us validate user input on the server side.
const Joi = require('joi');

module.exports = {
    /** This function will recieve one of the schemas and will need ot check if the incoming data is correct 
     *  The return function will get passed in the auth route before the controller is called.
     */
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                // Helps us retrieve the error message. We can collect multiple errors from the details array
                // and concatenate the errors to display them all to the user.
                console.log(result.error.details[0].message);
                return res.status(400).send(result.error.details[0].message);    
            }

            if (!req.value) {
                // Creating a  
                req.value = {};
            }
            req.value['body'] = result.value;
            next(); // write next() to pass the controller or the next function in queue
        }
    },

    schemas: {
        registerSchema: Joi.object().keys({
            name: Joi.string().min(2).required(),
            studentId: Joi.number().integer().min(100000).max(99999999).required(),
            username: Joi.string().alphanum().min(7).max(9).required(),
            email: Joi.string().email({
                minDomainAtoms: 4
            }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }),
        authSchema : Joi.object().keys({
            email: Joi.string().email({
                minDomainAtoms: 4
            }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }),
        // bookingSchema : Joi.object().keys({

        // })
    }
}