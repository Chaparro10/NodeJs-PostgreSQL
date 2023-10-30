const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('tienda_db', 'postgres', 'Chaparro07', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    define: {
      timestamps: false,
    },
    schema: 'tienda', // Reemplaza 'nombre_del_esquema' con el nombre de tu esquema
  });
  

module.exports = sequelize;











//sin utilizar sequelize
/**const { Client } = require('pg');

// Configura la conexión a la base de datos
const client = new Client({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432, // Puerto por defecto de PostgreSQL
});

// Conéctate a la base de datos
client.connect();

// Ejecuta una consulta
client.query('SELECT * FROM tu_tabla', (err, res) => {
  if (err) {
    console.error('Error al ejecutar la consulta:', err);
  } else {
    console.log('Filas seleccionadas:', res.rows);
  }

  // Cierra la conexión
  client.end();
}); */
