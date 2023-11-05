const db = require('../data/models'); // Asegúrate de importar el modelo de usuario adecuadamente
const { Sequelize } = require('sequelize');

module.exports = {
  // Endpoint para listar usuarios
  list: async (req, res) => {
    try {
      const usuarios = await db.usuario.findAll(); // Esto obtendrá todos los usuarios de la base de datos
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
  },

  // Endpoint para buscar usuarios
  buscar: async (req, res) => {
    try {
      const { query } = req.query;
      const usuarios = await db.usuario.findAll({
        where: {
          // Define aquí cómo deseas realizar la búsqueda de usuarios
          // Por ejemplo, puedes buscar por nombre o email
          // Asumiendo que deseas buscar por nombre:
          nombre: {
            [db.Sequelize.Op.like]: `%${query}%`,
          },
        },
      });
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar usuarios' });
    }
  },

  eliminar: async (req, res) => {
    try {
      const usuarioId = req.params.id;
      console.log("ID de usuario recibido:", usuarioId);
  
      // Buscar el usuario por ID en la base de datos
      const usuario = await db.usuario.findByPk(usuarioId);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Eliminar el usuario de la base de datos
      await usuario.destroy();
  
      return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  }
}