
const formatMessage = (code, message, desc) => {
    var obj = {
        "code": code,
        "description": desc,
        "message": message
        
    }
    return obj;
};

exports.formatMessage=formatMessage;