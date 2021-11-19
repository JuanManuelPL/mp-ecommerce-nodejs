var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

let response = {code: 200, message: 'Ok', error: false, body: {}};

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/', require('./router/routes'));

app.use(function (req, res, next) {
    
    response = {error: true, code: 404, message: 'URL no encontrada'};
    
    res.status(404).send(response);
});

app.listen(port, () => {
    console.log('El servidor está inicializado en el puerto ' + port);
});  