const express = require('express');
const router = express.Router();

var itemRouter = express.Router({ mergeParams: true });
router.use('/:msp432', itemRouter);

const formatError = (code, message, desc) => {
    var obj = {
        "code": code,
        "message": message,
        "description": desc
    }
    return obj;
};
router.get('/',async(req,res,next)=>{
    res.send("Hit msp432 API")
})

module.exports = router;