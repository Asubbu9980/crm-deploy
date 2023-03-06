module.exports.success = (res, message = '', data = []) => {
    res.json({
        status: 200,
        message: message,
        data: data
    })
}

module.exports.error = (res, message = '', err, data = {}) => {
    res.json({
        status: 500,
        message: message ? message : err.message,
        error: err,
        data: data
    })
}

module.exports.unauthorized = (res, message = '', err, data = {}) => {
    res.json({
        status: 401,
        message: message ? message : err.message,
        error: err,
        data: data
    })
}
