//@ts-check
var express = require('express');
var router = express.Router();

var db = require('../workers/dbLibrary.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html');
});

router.get('/ssh', function (req, res, next) {
  res.send('<img src="/images/ssh.png"/>');
});

router.get('/summary', function (req, res, next) {
  res.render('summary.html');
});

router.get('/feeds', function (req, res, next) {
  var sql = `Select nome, cognome,messaggio,s.subject,f.creation_date,f.Id from feeds f, subjects s WHERE s.Id = f.Id_subject`;
  db.query(sql, function (err, body, fields) {
    if (err) console.log(err);
    else res.send(body);
  })
});

router.get('/subjects', function (req, res, next) {
  var sql = `select Id,subject,description from subjects`;
  db.query(sql, function (err, body, fields) {
    if (err) console.log(err);
    else res.send(body);
  })
});

router.post('/', function (req, res, next) {
  db.sendFeed(req.body,res);
});

module.exports = router;