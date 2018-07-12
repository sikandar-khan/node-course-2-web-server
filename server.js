const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
const port = process.env.PORT || 3000;
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
        res.send('bad page');
    })
    .get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: 'About Page'
        });
    })
    .get('/projects', (req, res) => {
        res.render('projects.hbs', {
            pageTitle: 'Projects Page',
            actualMessage:'Portfolio here'
        });
    })
    .listen(port, () => console.log(`App started on port ${port}`));