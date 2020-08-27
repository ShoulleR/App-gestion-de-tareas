//Aqui Vamos a hacer las rutas para Crear,Actualizar,Borrar usuarios

const express = require('express');
const bcrypt = require('bcrypt');
const sql = require('../database');
const util = require('util');
const app = express();



// config promesa
const query = util.promisify(sql.query).bind(sql);



app.get('/registro', (req, res) => {

    res.render('registro');

});




//AQUI SE CREAN LOS USUARIOS CON CLAVE ENCRIPTADA

app.post('/registro', async(req, res) => {

    let body = req.body

    bcrypt.hash(body.password, 10, async function(err, hash) {
        // Store hash in your password DB.
        if (err) {
            res.json('error en clave');
        }

        const usuario = {
            name: body.name,
            email: body.email,
            password: hash
        }

        let email = body.email;

        let usuarioDB = await query('SELECT * FROM usuarios WHERE email= ?', [email]);

        if (usuarioDB == "") {
            await query('INSERT INTO usuarios set ?', [usuario]) // con el simbolo ? se le pasa todo lo que viene despues. y se le pasa el dato dentro de un arreglo
            res.redirect('login');

        } else {
            res.send('Email ya esta en uso');
        }



    });




});


app.post('/login', async(req, res) => {

    let body = req.body;

    let email = body.email;

    let data = await query(`SELECT * FROM usuarios WHERE email= ?`, [email]);

    await bcrypt.compare(body.password, data[0].password, (err, usuarioDB) => {
        console.log(usuarioDB);
        if (usuarioDB === false) {
            res.redirect('login');
        }
        res.render('login', { data: data[0] })

    }); //<-- Va a regresar un true o un false para identificar si la contraseñas encryptadas hacen Macth.




});


app.get('/login', (req, res) => {
    res.render('index');
})





module.exports = app;