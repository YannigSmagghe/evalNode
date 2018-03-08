const express = require('express');
const router = express.Router();
const db = require('../helpers/fake-db');

module.exports = router;

router.get('/', function(req, res, next) {
    res.status(200);
    res.contentType('html');
    res.render('index', { title: 'Bienvenue' });
});

router.get('/list', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    db.getAll().then(data => {
        res.render('list', {
            title: 'Liste',
            data: data
        });
    })
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

router.get('/currency', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    res.send('devises');
});