const express   = require('express'),
      router    = express.Router(),
      ShortUrl  = require('../models/shortUrl');

router.get('/', async (req, res) => {
    res.redirect('/shortUrls');
});

router.get('/shortUrls', async (req, res) => {
    const urls = await ShortUrl.find();
    res.render('index', { urls: urls });
});

router.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
});

router.delete('/shortUrls/:id', (req, res) => {
    ShortUrl.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/shortUrls');
});

router.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) {
        return res.sendStatus(404);
    }

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
});

module.exports = router;