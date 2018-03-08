const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
    let min = new Date().getMinutes();

    // Check minutes to lock access if it's between 49 and 59
    if(min > 15 && min < 30){
        res.status(403);
        res.send('Site trop populaire actuellement. Veuillez réessayer plus tard.');
    } else {
        next();
    }
 });

module.exports = router;
