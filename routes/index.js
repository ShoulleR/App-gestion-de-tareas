const express = require('express');
const app = express();

//===============================================
//======ARCHIVO PARA CONFIGURAR LAS RUTAS========
//===============================================




app.use(require('./registro'));
app.use(require('./tareas'));













module.exports = app;