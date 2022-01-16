const express   = require('express'),
      router    = express.Router(),
      ShortUrl  = require('../models/shortUrl');

router.get('/', (req, res) => {
    res.redirect('/shortUrls');
});

router.get('/shortUrls', (req, res) => {
    ShortUrl.find({}, function(err, urls) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { urls: urls });
        }
    });
});

router.post('/shortUrls', (req, res) => {
    ShortUrl.create({ full: req.body.fullUrl }, function(err, url) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

router.delete('/shortUrls/:id', (req, res) => {
    ShortUrl.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect('/shortUrls');
        } else {
            res.redirect('/shortUrls');
        }
    });
});

router.get('/:shortUrl', (req, res) => {
    ShortUrl.findOne({ short: req.params.shortUrl }, function(err, shortUrl) {
        if (err) {
            console.log(err);
        } else {
            if (shortUrl == null) {
                return res.sendStatus(404);
            }
        
            shortUrl.clicks++;
            shortUrl.save();
        
            res.redirect(shortUrl.full);
        }
    });
});

module.exports = router;