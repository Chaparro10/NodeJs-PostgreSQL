const Persona = require('../models/persona');
const sequelize = require('../bd');

const getPersona = async (req, res) => {
    try {
        const personas = await Persona.findAll();
        res.json({ success: true, data: personas });
    } catch (error) {
        console.error('Error de Sequelize:', error); // Registra el error en la consola para depuración
        res.status(500).json({ success: false, error: 'Error al obtener personas: ' + error.message });
    }
};

const agregaPersona = async (req, res) => {
    try {
        const { nombre, apellido, telefono } = req.body;
        console.log(nombre)
        const newPerson = await Persona.create({
            nombre,
            apellido,
            telefono
        });

        res.json({ success: true, message: "Empleado Creado", data: newPerson })

    } catch (error) {
        console.error('Error Sequelize: ', error)
        res.status(500).json({ success: false, error: 'Error al guardar personas: ' + error.message });
    }
}

const getPersonaID = async (req, res) => {
    try {
        const person = await Persona.findByPk(req.params.id);
        console.log(person)
        if (!person) {
            return res.status(404).json({ success: false, message: "Persona no encontrado." });
        }
        res.json({ success: true, data: person });
    } catch (error) {
        console.error('Error de Sequelize:', error); // Registra el error en la consola para depuración
        res.status(500).json({ success: false, error: 'Error al obtener Persona: ' + error.message });
    }
};
//BUSCAR EMPLEADO POR NOMBRE FORMA LIKE
const buscarPersonaPorNombre=async(req,res)=>{
    try{
        const search = req.params.search || ''; // Obtiene el parámetro 'search' de la solicitud o establece una cadena vacía si no está presente.
              // Utiliza Sequelize para buscar empleados cuyos nombres coincidan con la búsqueda de forma insensible a mayúsculas y minúsculas.
              const personasEncontradas = await Persona.findAll({
                where: sequelize.literal(`LOWER(nombre) LIKE LOWER('%${search}%')`) 
               });

               if (personasEncontradas.length === 0) { // Verifica si el arreglo está vacío
                res.status(404).json({
                    success: false,
                    error: 'Perosna no encontrado.'
                });
            } else {
                res.json({ success: true, data: personasEncontradas });
            }
    }catch(error){
        console.error('Error de Sequelize:', error); // Registra el error en la consola para depuración
        res.status(500).json({ success: false, error: 'Error al obtener Persona: ' + error.message });
    }
}
const actualizarPersona = async (req, res) => {
    try {
        const { nombre, apellido, telefono } = req.body;
        const personaId = req.params.id; // Obtén el ID de la persona de los parámetros de la solicitud
        const persona = await Persona.findByPk(personaId);  // Debes tener una función para obtener la persona por su ID
        console.log('Persona encontrada:', persona);
        if (!persona) {
            return res.status(404).json({ success: false, message: "Persona no encontrada." });
        }

        // Actualizar los campos de la persona
        persona.nombre = nombre;
        persona.apellido = apellido;
        persona.telefono = telefono;

        // Guardar los cambios en la base de datos
        await persona.save();

        res.json({ success: true, message: "La persona ha sido actualizada." });
    } catch (error) {
        console.error('Error de Sequelize:', error); // Registra el error en la consola para depuración
        res.status(500).json({ success: false, error: 'Error al actualizar persona: ' + error.message });
    }
}


module.exports = {
    getPersona,
    agregaPersona,
    getPersonaID,
    actualizarPersona,
    buscarPersonaPorNombre
}