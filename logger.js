const fs = require('fs');

const TAINTED_DATA = "Request contains tainted values, skipping logging";
LOG_FILE = 'log.txt';

function onLogError() {
    console.log("Logging failed");
}

module.exports.logger = () => (req, res, next) => {
    const logBody = JSON.stringify(req.body);
    const fullLog = req.url+" with body:"+logBody;

    if (logBody.isTainted()) {
        const isTainedMessage = req.url+": "+TAINTED_DATA;
        console.log(isTainedMessage);
        fs.appendFile(LOG_FILE, isTainedMessage+"\n", onLogError);
        next();
        return;
    }
    console.log(fullLog);
    fs.appendFile(LOG_FILE, fullLog+"\n", onLogError);
    next();
}

module.exports.LOG_FILE = LOG_FILE