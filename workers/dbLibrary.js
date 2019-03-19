var mysql = require('mysql');
var async = require('async');
var fs = require('fs');
//async è una libreria particolare che permette di lavorare senza la necessita dell'uso delle callabck

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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
    sendFeed: function (param, rres) {
        var sql = 'INSERT INTO sicurezza_informatica.feeds' + `(nome,cognome,email,Id_subject,messaggio) VALUES ('` + param.nome + `','` + param.cognome + `','` + param.email + `','` + param.Id_subject + `','` + param.messaggio + `')`;
        con.query(sql, function (err, res, fields) {
            if (err) rres.send(err);
            else rres.redirect('/summary');
        });
    }
}

startCon();