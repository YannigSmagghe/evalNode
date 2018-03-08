const express = require('express');
const router = express.Router();
const db = require('../helpers/fake-db');
const currency = require('../app/currency');
const xss = require('locutus/php/strings');

module.exports = router;

router.get('/', function(req, res, next) {
    res.status(200);
    res.contentType('html');
    res.render('index', { title: 'Welcome' });
});

router.get('/items', function (req, res, next) {
    res.contentType('html');

    currency.getCurrencies((error, currencies) => {
        db.getAll().then(data => {
            (function nextIteration(i) {
                if (i === data.length) {
                    res.render('items', {
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

                        data[i].priceEur= resolvedValue.toFixed(2);
                        nextIteration(i + 1);
                    });
                }
            })(0);
        })
        .catch(err => {
            console.log(err);
        });
    });
});


router.get('/new', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    res.render('new', {
        title: 'Add element'
    });
});

router.post('/new', function (req, res, next) {
    const data = checkForm(req.body);
    if(data === false) {
        res.redirect('/new');
    } else {
        db.add(data)
            .then(() => {
                res.status(200);
                res.contentType('html');
                res.redirect('/items');
            })
            .catch(err => {
                console.log(err);
            });
    }
});

router.get('/item/:id', function (req, res, next) {
    const id = req.params.id;
    res.status(200);
    res.contentType('html');
    db.getOne(id)
        .then(item => {
            res.render('item', {
                title: 'Detail',
                item: item
        })
        .catch(err => {
            console.log(err);
        });
    })
});


function checkForm(unescapedData) {
    if(unescapedData.name === undefined || unescapedData.priceEur === undefined) {
        return false;
    }

    const name = xss.strip_tags(unescapedData.name, '');
    const price = xss.strip_tags(unescapedData.priceEur, '');
    const data = {
        name: name,
        priceEur: price
    };
    return data;
}