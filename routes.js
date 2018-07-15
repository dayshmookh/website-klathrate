var express = require('express');
var router = express.Router();


// Client pages -----

router.get('/', function (req, res) {
    res.render('homepage');
});

router.get('/about', function (req, res) {
    res.render('about');
});

router.get('/financers', function (req, res) {
    res.render('financers');
});

router.get('/privacypolicy', function (req, res) {
    res.render('privacypolicy');
});

router.get('/businesses', function (req, res) {
    res.render('businesses');
});

router.get('/guarantee', function (req, res) {
    res.render('guarantee');
});


//export this router to use in our index.js
module.exports = router;