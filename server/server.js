const express = require('express');
const cnn = require('../database');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const flash = require('connect-flash');



//iniciamos express
const app = express();


//parse application/x - www - form - urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json()); //MIDDLEWARES : TODAS LAS PETICIONES PASARAN POR AQUI.


//session para flash
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));
//flash
app.use(flash());


//habilitamos la carpeta public aca
const publicPath = path.resolve(__dirname, '../public');


//que use el public
app.use(express.static(publicPath));


// Express HBS engine
hbs.registerPartials(__dirname + '/views/partials'); //investigar porque no me funcionan los handlebard
app.set('view engine', 'hbs');



//RUTAS GLOBALES
app.use(require('../routes/index'));



//PUERTO
const port = process.env.PORT || 3000;








app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});




module.exports = app;