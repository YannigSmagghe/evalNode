const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
    let min = new Date().getMinutes();

    // Check minutes to lock access if it's between 49 and 59
    if(min >= 49 && min <= 59){
        res.status(429);
        res.render('error/index',{
            title:'Error',
            message:'Actually this site is overwhelmed by his popularity. Try to access it later.'
        });
    } else {
        next();
    }
 });

module.exports = router;
