'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./utils/pass');
const session = require('express-session');
const app = express();
const port = 3000;


// add following after const port = 3000;
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};


//älä tee näin projektissa (koko slide)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const username ='foo';
const password = 'bar';
app.use(cookieParser());
app.use(session({
  secret:'salaisuuksia',
  resave: false,
  saveUninitialized:true,
  cookie: {maxAge: 36000}
}));

// add following after app.use(session...
app.use(passport.initialize());
app.use(passport.session());


app.set('views', './views');
app.set('view engine', 'pug');

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    });


app.get('/', (req, res) => {
  res.render('home');
});





app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr, {httpOnly: true}).send('cookie set');
});
app.get('/readCookie', (req, res) => {
  console.log('cookies ', req.cookies.color)
  res.send('cookie read');
});
app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('cookie deleted');
});

app.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
