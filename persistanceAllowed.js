module.exports.persistanceAllowed = () => (req, res, next) => {
    let securePersistanceHeader = req.header('Persistance-Allowed')
    if (!securePersistanceHeader) {
        next();
        return
    }

    let parts = securePersistanceHeader.split(";")
    let mainDirective = parts[0]
    let keyRestrictions = undefined
    if (!!parts[1] && new RegExp("key-restrictions: ").test(parts[1])) {
        keyRestrictions = JSON.parse(parts[1].replace("key-restrictions: ", "").trim())
    }

    switch (mainDirective) {
        case "none":
            taintNested(req.body, keyRestrictions, true);
            next();
            return;
        case "any":
        default:
            if (keyRestrictions) taintNested(req.body, keyRestrictions, false);
            next();
            return;
    }
}

function taintNested(obj, keyRestrictions, taint) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] == 'string') {
            let shouldTaint = taint
            if (keyRestrictions && keyRestrictions[key]) {
                keyRestrictions[key] == "none" ? shouldTaint = true : shouldTaint = false;
            }
            if (shouldTaint) obj[key] = obj[key].taint();
        }
        if (isObject(obj[key])) {
            taintNested(obj[key], keyRestrictions && keyRestrictions[key], taint)
        }
    });
}

function isObject(obj) {
    const type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};