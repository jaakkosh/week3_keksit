'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/setCookie', (req, res) => {
  res.cookie('color', req.params.crl, {httpOnly: true}).send('cookie set');
});
app.get('/readCookie', (req, res) => {
  console.log('cookies ', req.cookies)
  res.send('cookie read');
});
app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
