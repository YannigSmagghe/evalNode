const express = require('express');
const morgan = require('morgan');
const db = require('../helpers/fake-db');
const router = express.Router();
const logsMiddleware = morgan('tiny');
const routes = require('./routes');

/** GET home page. */

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

router.use(routes);

/** Private Session */

router.use('/private', function respond403(req, res) {
    console.log('Request Type:', req.method);
    res.status(403);
    res.render('error/index',{
        title:'Error',
        message:'Section privée'
    });
});

router.use('*', function respond404(req, res) {
    res.status(404);
    res.render('error/index',{
        title:'Error',
        message:'Page introuvable'
    });
});

module.exports = router;
