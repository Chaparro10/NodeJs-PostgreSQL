const { Router } = require('express');
const router = Router(); // Crear una instancia del enrutador

const { getPersona} = require('../controllers/controllersPersona'); // Importamos los métodos para utilizarlos en las rutas
//http://localhost:3001/api/personas/
router.route('/').get(getPersona)//Ruta traer Personas



module.exports=router;