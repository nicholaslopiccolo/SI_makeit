var mysql = require('mysql');
var md5 = require('md5');
//async è una libreria particolare che permette di lavorare senza la necessita dell'uso delle callabck

var con = mysql.createConnection({
    host: 'localhost',
    user: 'pippo',
    password: 'password',
    insecureAuth: true,
    database: 'sicurezza_informatica'
});

//una volta eseguita la connessione  bisogna passare la variabile con a tutte le altre funzioni o rendera una variabile globale o bho
var startCon = function () {
    console.log('start connection DATABASE')
    con.connect(function (err) {
        console.log('Attempt con');
        if (err) {
            console.log('Connection Error SQL:   ' + err.code + '\nTry again');
        } else {
            console.log('Connection to db done ' + '\n');
        }
    });
};
module.exports = {
    query: function (query, callback) {
        con.query(query, callback)
    },
    getFeeds(req, res) {
        var sql = `Select nome, cognome,messaggio,s.subject,f.creation_date,f.Id from feeds f, subjects s WHERE s.Id = f.Id_subject`;
        con.query(sql, function (err, body, fields) {
            if (err) throw err;
            else {
                console.log(body);
                res.send(body);
            }
        });
    },
    sendFeed: function (p, rres) {
        var sql = `INSERT INTO sicurezza_informatica.feeds (nome,cognome,email,Id_subject,messaggio) VALUES (?,?,?,?,?)`;
        con.query(sql, [p.nome, p.cognome, p.email, p.Id_subject, p.messaggio], function (err, res, fields) {
            if (err) rres.send(err);
            else rres.redirect('/summary');
        });
    },
    adminLogin(req, res) {
        const body = req.body;
        let sql = 'select password from admins where username = ? limit 1';
        con.query(sql,[body.username],function(err,data,fields){
            if(err) throw err;
            else if(data[0].password == md5(body.password)){
                req.session.admin = true;
                res.redirect('/summary');
            }
            else res.redirect('/login');
        });
        /*
        if (req.body.username == 'root' && req.body.password == 'makeItSI.19') { //sistema molto poco statico...
            req.session.admin = true;
            res.redirect('/summary');
        } else return res.status(400).send({
            message: 'Login error!'
        });*/
    }
}

startCon();