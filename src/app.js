const express =require('express')

const sequelize =require('./bd.js');

const app=express();

const port=3001;

// Configurar middleware y rutas
app.use(express.json());
//ruta para nuestra api de Personas
app.use('/api/personas',require('./routes/routePersona.js'));

// Iniciar la conexión a la base de datos y luego arrancar el servidor
sequelize.sync()
  .then(() => {
    console.log('Base de datos PostgreSQL sincronizada');
    app.listen(port, () => {
      console.log(`Servidor en ejecución en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });