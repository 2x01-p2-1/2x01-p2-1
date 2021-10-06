const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ mergeParams: true });
router.use('/:student', itemRouter);

const formatError = (code, message, desc) => {
    var obj = {
        "code": code,
        "message": message,
        "description": desc
    }
    return obj;
};
router.get('/',async(req,res,next)=>{
    res.send("Hit Student API")
})
module.exports = router;