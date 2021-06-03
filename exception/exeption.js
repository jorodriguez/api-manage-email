
class Exception {

    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

}

class ValidationException extends Exception {
    constructor(errorMessage) {
        super(errorMessage);
    }
}



module.exports = { Exception, ValidationException };