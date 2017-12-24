const express = require('express');
const hbs = require('express-handlebars');

/**
  * Dotenv is a library for loading envionmental variables
  * from a file instead of having to manually
  * enter them from the command line every time.
  * Because this file might contain very sensitive
  * information, it should not be committed to version control (Github)
  *
  * Here is the github page for the library. https://github.com/motdotla/dotenv
  * See if you can use this to store your process.env.PORT. That way we don't
  * even need a default
  *     const port = process.env.PORT || 3000
  * We can just do
  *     const port = process.env.PORT instead
  *
  * As for the not comitting it to version control. You can manage
  * what files git will add to your repo with a .gitignore file.
  * See here: https://help.github.com/articles/ignoring-files/
  */
const dotenv = require('dotenv');

// You might notice the log middleware you had before is gone
// It is now located in a server directory. This helps us keep
// our code more organized and easier to maintain. Now we can just tell our
// app to use the middleware
const logger = require('./server/log');
const port = process.env.PORT || 3000;
const app = express();

/**
  * app.engine might be new to you. It isn't something you use frequently
  * but you can use it to tell express what engine to use to render views
  * it's similar to app.set('view engine'), but this allows you to have
  * control like pass in custom engine like we are here or make express
  * render 'hbs' files with whatever engine you want.
  *
  * I've installed the express-handlebars library because it makes
  * working with handlebars really nice and streamline. It makes you end up
  * writing a bit less code everytime. I implemented the actual configuration here
  * for you. I want you to check out these docs and try to fill in the rest
  * of the configuration.
  *
  * https://github.com/ericf/express-handlebars
  *
  */

app.engine('hbs', hbs({
    extname: '',
    partialsDir: '',
    helpers: {}
}));

app.set('view engine', 'hbs');
app.use(express.static('./public'));

// Add our logger
app.use(logger);

app.get('/', (req, res) => {
    res.render('homepage', {
        pageTitle: 'Homepage',
        pageBody: 'This is my first homepage'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        pageBody: 'About!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fullfill this request'
    });
});

app.listen(port, () => console.log(`Server running at port: ${port}`));
