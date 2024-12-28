
const TryCatch = (targetFunc) => async (req, res, next) => {
    try {
        await targetFunc(req, res, next)
    } catch (error) {
        next(error)
    }
}

const errorMiddleware = async (err, req, res, next) => {
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;

    if (err.code === 11000) {
        const error = Object.keys(err.keyPattern).join(",");
        err.message = `Duplicate field - ${error}`;
        err.statusCode = 400;
    }

    if (err.name === "CastError") {
        const errorPath = err.path;
        err.message = `Invalid Format of ${errorPath}`;
        err.statusCode = 400;
    }
    if (err.name === "ValidationError") {
        const errorPath = err.path
        err.message = `required field missing at ${errorPath}`;
        err.statusCode = 400;
    }

    const response = {
        success: false,
        message: err.message,
    };

    return res.status(err.statusCode).json(response);
}

export { errorMiddleware, TryCatch }