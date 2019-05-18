import validator from 'validator';

class FormValidator {
    constructor(validations) {
        // validations is an array of rules specific to a form
        this.validations = validations;
    }

    validate(state) {
        // start out assuming valid
        let validation = this.valid();
        // for each validation rule
        this.validations.forEach(rule => {

            // if the field isn't already marked invalid by an earlier rule
            if (!validation[rule.field].isInvalid) {
                // determine the field value, the method to invoke and
                // optional args from the rule definition
                const field_value = state[rule.field].toString();
                const args = rule.args || [];
                const validation_method = typeof rule.method === 'string' ? validator[rule.method] : rule.method;

                // if rule not valid
                if (validation_method(field_value, ...args, state) !== rule.validWhen) {
                    validation[rule.field] = {
                        isInvalid: true,
                        message: rule.message,
                        classText: "form-control is-invalid"
                    };
                    validation.isValid = false;
                }
            }
        });
        return validation;
    }

    // create a validation object for a valid form
    valid() {
        const validation = {};
        this.validations.map(rule => (
            validation[rule.field] = {isInvalid: false, message: '', classText: "form-control"}
        ));
        return {isValid: true, ...validation};
    }
}

export default FormValidator;