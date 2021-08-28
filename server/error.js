class ServerError extends Error {
    constructor(code = 500, message = "", ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError);
        }

        this.name = "ServerError";
        this.message = message;
        this.code = code;
        this.date = new Date();
    }
}

module.exports = ServerError;
