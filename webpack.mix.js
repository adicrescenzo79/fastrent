let mix = require('laravel-mix');

mix.sass('src/scss/master.scss', 'assets/css/').options({
    processCssUrls: false
});
