const express = require('express');
const router = express.Router();
const {
  getPersona,
  agregaPersona,
  getPersonaID,
  actualizarPersona,
  buscarPersonaPorNombre,
  generarPersonasPDF
} = require('../controllers/controllersPersona');

// Rutas relacionadas con personas
////http://localhost:3001/api/personas/
router.get('/', getPersona);
router.post('/', agregaPersona);
router.get('/search/:search', buscarPersonaPorNombre);
router.get('/:id', getPersonaID);
router.put('/:id', actualizarPersona);
//Generar PDF(http://localhost:3001/api/personas/)
router.get('/pdf/pdf',generarPersonasPDF)



module.exports = router;
