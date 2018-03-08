const express = require('express');
const router = express.Router();
const currency = require('../app/currency');
const multer = require('multer');
const data = multer();

router.post('/', data.array(), function(req, res, next) {
    console.log(req.body);
    let promise = new Promise((resolve, reject) => {
        try {
            currency.calcul(req.body.value, req.body.currency, (error, value) => {
                if (error) {
                    reject(error);

                    return;
                }

                resolve({
                    'success': true,
                    'data': value,
                });
            });
        } catch(error) {
            reject(error);
        }
    });

    promise
        .then(json => {
            res.json(json);
        })
        .catch(error => {
            res.json({
                'success': false,
                'message': error
            });
        })
    ;
});

module.exports = router;
