const express = require('express');
const morgan = require('morgan');
const db = require('../helpers/fake-db');
const router = express.Router();
const logsMiddleware = morgan('tiny');

/* GET home page. */

router.use(function (req, res, next) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    let hh = today.getHours();
    let mn = today.getMinutes();
    let s = today.getSeconds();

    if(dd<10) {
        dd = '0'+dd;
    }
    if(mm<10) {
        mm = '0'+mm;
    }
    if(hh<10){
        hh = '0'+hh;
    }
    if(mn<10){
        mn = '0'+mn;
    }
    if(s<10){
        s = '0'+s;
    }

    today = mm + '/' + dd + '/' + yyyy;
    const timestamp = mn + 'h' + hh + 'm' + s + 's';
    console.log('Date:', today, 'Time:', timestamp);
    next();
});

router.use(logsMiddleware);

router.get('/', function(req, res, next) {
    res.status(200);
    res.contentType('html');
    res.render('index', { title: 'Bienvenue' });
});

router.get('/list', function (req, res, next) {
    const data = await db.getAll();
    res.status(200);
    res.contentType('html');
    res.render('list', {
        title: 'Liste des items ',
        list: data,
    })
});

router.get('/new', function (req, res, next) {
    res.status(200);
    res.contentType('html');
    res.send('new');
});

router.get('/detail/:id', function (req, res, next) {
    const id = req.params.id;
    res.status(200);
    res.contentType('html');
    res.render('detail', { title: 'Détail de l\'item' + id})
});



router.use('*', function respond404(req, res) {
    res.status(404);
    res.send('Page introuvable');
});

module.exports = router;
