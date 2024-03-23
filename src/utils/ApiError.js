class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        statck = ""
    ){
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data = null;
        this.success = false;
    }
    if(statck){
        this.statck = statck;
    }
    // } else{
    //  Error.captureStackTrace(this,this.constructor)   
    // }
}