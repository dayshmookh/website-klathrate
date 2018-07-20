var express = require('express');
var router = express.Router();


// Client pages -----

router.get('/', function (req, res) {
    res.render('homepage', {
        title: "Home"
    });
});

router.get('/about', function (req, res) {
    res.render('about', {
        title: "About"
    });
});

router.get('/financers', function (req, res) {
    res.render('financers', {
        title: "Financers"
    });
});

router.get('/privacypolicy', function (req, res) {
    res.render('privacypolicy', {
        title: "Privacy Policy"
    });
});

router.get('/businesses', function (req, res) {
    res.render('businesses', {
        title: "Businesses"
    });
});

router.get('/guarantee', function (req, res) {
    res.render('guarantee', {
        title: "Trade Guarantee"
    });
});


//export this router to use in our index.js
module.exports = router;
