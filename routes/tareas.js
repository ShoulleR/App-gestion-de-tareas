//AGREGAR TAREAS
const express = require('express');
const sql = require('../database');
const util = require('util');
const app = express();




// config promesa
const query = util.promisify(sql.query).bind(sql);





//INICIO DE LA PAGINA PARA AGREGAR TAREAS.
app.get('/add', (req, res) => {

    res.render('add');


});



//Aqui se crean las tareas y se guardan.
app.post('/add', (req, res) => {

    let body = req.body

    const tarea = {
        tarea: body.tarea,
        descripcion: body.descripcion,
    }

    sql.query('INSERT INTO tareas set ?', [tarea]) // con el simbolo ? se le pasa todo lo que viene despues. y se le pasa el dato dentro de un arreglo
    res.redirect('/tareas');
});



//************************ */
//TAREAS//



//TOMA TODAS LAS TAREAS Y LAS MUESTRA 
app.get('/tareas', async(req, res) => {
    var data;
    data = await query('SELECT * FROM tareas');

    res.render('tareas', { data })


});


app.get('/delete/:id', async(req, res) => {

    let id = req.params.id

    if (id) {
        await query(`DELETE FROM tareas WHERE ID= ${id}`);
    }
    res.redirect('/tareas');


});

//AQUI TOMAMOS EL LO QUE EL USUARIO QUIERE EDITAR DE LA BASE DE DATOS. 

app.get('/edit/:id', async(req, res) => {
    let id = req.params.id

    let data = await query(`SELECT * FROM tareas WHERE ID= ${id}`)


    res.render('edit', { data: data[0] });
});



//CUANDO EL USUARIO LE DE EN GUARDAR EN EDIT.HBS LO MANDAMOS PARA ACA PARA MODIFICAR LA TAREA DE BASE DE DATOS
app.post('/edit/:id', async(req, res) => {

    let id = req.params.id;
    let body = req.body;

    const tareaMod = {
        tarea: body.tarea,
        descripcion: body.descripcion
    }

    if (id) {
        await query(`UPDATE tareas set ? WHERE ID= ?`, [tareaMod, id]);
    }

    res.redirect('/tareas');

});







module.exports = app;