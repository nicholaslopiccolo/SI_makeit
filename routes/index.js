var express = require('express');
var router = express.Router();

var db = require('../workers/dbLibrary.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html');
});

router.get('/summary', function (req, res, next) {
  if (req.session.admin) res.render('admin/summary.html')
  else res.render('summary.html');
});

router.get('/feeds', db.getFeeds);

router.get('/subjects', function (req, res, next) {
  var sql = `select Id,subject,description from subjects`;
  db.query(sql, function (err, body, fields) {
    if (err) console.log(err);
    else res.send(body);
  })
});

router.post('/', function (req, res, next) {
  db.sendFeed(req.body, res);
});


router.get('/login', function (req, res, next) {
  res.render('login.html');
});

router.get('/logout', function (req, res, next) {
  req.session = null;
  res.redirect('/summary');
});

router.post('/login', function (req, res, next) {
  if (req.body.username == 'root' && req.body.password == 'makeItSI.19') { //sistema molto poco statico...
    req.session.admin = true;
    res.redirect('/summary');
  } else return res.status(400).send({
    message: 'Login error!'
  });
});

router.post('/delete', function (req, res, next) {
  if (req.session.admin) {
    var sql = `DELETE FROM feeds WHERE Id = '` + req.body.Id + `'`;
    db.query(sql, function (err, body, fields) {
      if (err) console.log(err);
      else res.redirect('/summary');
    });
  }
  else res.render('error.html');
});

module.exports = router;