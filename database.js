const mysql = require('mysql');



//AQUI ESTABLECEMOS LA CONEXION CON DATABASE PARA USUARIOS

var cnn = mysql.createConnection({
    host: 'localhost',
    user: 'node_user',
    password: '123456',
    database: 'usuarios_tareas'
});

cnn.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err);
        return;
    }

    console.log('Base de datos Online');


});


module.exports = cnn;


//function ejecutarQuery(query, callback) {
//    mysql.query(query, (err, results) => {
//        if (err) {
//            console.log('Error en Query');
//            console.log('err');
//            return callback(err); // se le dice que se hizo lo que se pudo y se envia el error de vuelta
//        }
//        if (results.length === 0) {
//            return callback('No hay resultados');
//        } else {
//            callback(null, results);
//        }
//    });
//}