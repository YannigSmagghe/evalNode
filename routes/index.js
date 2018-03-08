var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenue' });
});

router.get('/list', function (req, res, next) {
  res.send('liste');
});

router.get('/new', function (req, res, next) {
   res.send('new');
});

router.get('/detail/:id', function (req, res, next) {
   res.send('detail');
});

router.get('/currency', function (req, res, next) {
    res.send('devises');
})

module.exports = router;
