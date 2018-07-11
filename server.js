const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
let app = express();
app.use(express.static(__dirname + '/public'))
    .use((req, res, next) => {
        var log = `${new Date().toString()} ${req.method} ${req.url}`;
        console.log(log);
        fs.appendFile('server.log', `${log}\n`, (e) => console.log(e));
        next();
    })
    .get('/', (req, res) => {
        res.render('home.hbs', {
            pageTitle: 'Home Page',
            welcomeMessage: 'Welcome to my website'
        })
    })
    .get('/bad', (req, res) => {
        res.send('about page');
    })
    .get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: 'About Page'
        })
    })
    .listen(3000, () => console.log('app started!'));