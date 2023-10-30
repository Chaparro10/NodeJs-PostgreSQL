const Persona =require('../models/persona');
const sequelize =require('../bd');

const getPersona = async ( req, res) => {
    try {
        const personas = await Persona.findAll();
        res.json({ success: true, data: personas });
    } catch (error) {
        console.error('Error de Sequelize:', error); // Registra el error en la consola para depuración
        res.status(500).json({ success: false, error: 'Error al obtener personas: ' + error.message });
    }
};

module.exports={
    getPersona
}