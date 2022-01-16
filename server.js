const mongoose  = require('mongoose'),
      express   = require('express'),
      app       = express(),
      ShortUrl  = require('./routes/shortUrl'),
      methodOverride   = require('method-override');

mongoose.connect('mongodb://localhost/urlShortner', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(ShortUrl);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));