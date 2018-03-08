const express = require('express');
const router = express.Router();
const currency = require('../app/currency');

/* GET home page. */
router.post('', function(req, res, next) {
    console.log('XXXXXXXXXXXXXXXXXXXXXXX');
    console.log(req);

    currency.calcul(req.body.value, req.body.currency, (error, value) => {
        let response = {};

        if (error) {
            response.success = false;
            response.message = error;
        } else {
            response.success = true;
            response.value = value;
        }

        res.json(response);
    });
});

module.exports = router;
