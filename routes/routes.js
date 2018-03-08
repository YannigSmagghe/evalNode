const express = require('express');
const router = express.Router();
const db = require('../helpers/fake-db');
const currency = require('../app/currency');

module.exports = router;

router.get('/', function(req, res, next) {
    res.status(200);
    res.contentType('html');
    res.render('index', { title: 'Bienvenue' });
});

router.get('/list', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    currency.getCurrencies((error, currencies) => {
        db.getAll().then(data => {
            (function nextIteration(i) {
                if (i === data.length) {
                    res.render('list', {
                        title: 'List',
                        data: data,
                        currencies: currencies
                    });

                    return;
                }

                if (!req.query.cu) {
                    nextIteration(data.length);
                } else {
                    currency.calcul(data[i].priceEur, req.query.cu, (error, resolvedValue) => {
                        if (error) {
                            return;
                        }

                        data[i].priceEur= resolvedValue;
                        nextIteration(i + 1);
                    });
                }
            })(0);
        })
    });
});

router.get('/new', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    res.send('new');
});

router.get('/detail/:id', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    res.send('detail');
});
