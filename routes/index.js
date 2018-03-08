var express = require('express');
var router = express.Router();

/** GET home page. */
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

/** Private Session */

router.use('/private', function respond403(req, res) {
    console.log('Request Type:', req.method);
    res.status(403);
    res.render('error/index',{
        title:'Error',
        message:'Section privé'
    });
});

module.exports = router;
