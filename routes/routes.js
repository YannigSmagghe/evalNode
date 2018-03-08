const express = require('express');
const router = express.Router();
const db = require('../helpers/fake-db');
const xss = require('locutus/php/strings');

module.exports = router;

router.get('/', function(req, res, next) {
    res.status(200);
    res.contentType('html');
    res.render('index', { title: 'Bienvenue' });
});

router.get('/items', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    db.getAll()
        .then(data => {
            res.render('items', {
                title: 'Liste',
                data: data
        })
        .catch(err => {
            console.log(err);
        });
    })
});


router.get('/new', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    res.render('new', {
        title: 'Ajouter un élément'
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
                title: 'Détail',
                item: item
        })
        .catch(err => {
            console.log(err);
        });
    })
});

router.get('/currency', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    res.send('devises');
});


function checkForm(unescapedData) {
    if(unescapedData.name === undefined || unescapedData.priceEur === undefined) {
        return false;
    } else {
        const name = xss.strip_tags(unescapedData.name, '');
        const price = xss.strip_tags(unescapedData.priceEur, '');
        const data = {
            name: name,
            priceEur: price
        };
        return data;
    }
}