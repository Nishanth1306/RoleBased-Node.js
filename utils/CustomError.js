class CustomError extends Error{

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode > 400 ? 'Server Error' : 'Error';
    }
}

export default CustomError;