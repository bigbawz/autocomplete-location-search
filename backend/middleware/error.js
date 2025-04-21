const errorHandler = (err, req ,res, next) => {
    if (err.status) {
        res.status(err.status).json({ message: err.message }); // if this is a known error
    } else {
        res.status(500).json({ 
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack // checks if it is production mode, if true, returns null (hiding the stack trace), if false, shows the stack trace
        });
    }
};

export default errorHandler;