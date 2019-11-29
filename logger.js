module.exports.logger = () => (req, res, next) => {
    const logString = JSON.stringify(req.body);

    if (logString.isTainted()) {
        console.log("Request contains tainted values, skipping logging")
        next();
        return;
    }
    console.log(logString);
    next();
}