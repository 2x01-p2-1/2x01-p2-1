
const formatError = (code, message, desc) => {
    var obj = {
        "code": code,
        "description": desc,
        "message": message
        
    }
    return obj;
};

exports.formatError=formatError;