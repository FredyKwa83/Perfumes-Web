// const db = require('../data/models'); // Asegúrate de importar el modelo de usuario adecuadamente
// const { Sequelize } = require('sequelize');

// module.exports = {
//   list: async (req, res) => {
//     try {
//       const usuarios = await db.usuario.findAll();
//       res.json(usuarios);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
//     }
//   },

//   create: async (req, res) => {
//     try {
//       const nuevoUsuario = req.body;
//       const usuarioCreado = await db.usuario.create(nuevoUsuario);
//       res.status(201).json(usuarioCreado);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al crear un nuevo usuario' });
//     }
//   },

//   getById: async (req, res) => {
//     const usuarioId = req.params.id;
//     try {
//       const usuario = await db.usuario.findByPk(usuarioId);
//       if (!usuario) {
//         return res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//       res.json(usuario);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al obtener el usuario' });
//     }
//   },

//   update: async (req, res) => {
//     const usuarioId = req.params.id;
//     try {
//       const usuario = await db.usuario.findByPk(usuarioId);
//       if (!usuario) {
//         return res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//       const datosActualizados = req.body;
//       await usuario.update(datosActualizados);
//       res.json(usuario);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al actualizar el usuario' });
//     }
//   },

//   delete: async (req, res) => {
//     const usuarioId = req.params.id;
//     try {
//       const usuario = await db.usuario.findByPk(usuarioId);
//       if (!usuario) {
//         return res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//       await usuario.destroy();
//       res.status(204).json(); // 204 No Content
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al eliminar el usuario' });
//     }
//   }
// };


const db = require('../data/models'); // Asegúrate de importar el modelo de usuario adecuadamente

module.exports = {

  // Endpoint para ver la cantidad total de usuarios registrados
getTotalUsers: async (req, res) => {
  try {
    // Utiliza la conexión a la base de datos para obtener el total de usuarios
    const totalUsuarios = await db.usuario.count();
    res.json({ totalUsuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el total de usuarios' });
  }
},

  // Endpoint para obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const usuarios = await db.usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
  },

  // Endpoint para obtener un usuario por su ID
  getUserById: async (req, res) => {
    try {
      const usuarioId = req.params.id;
      const usuario = await db.usuario.findByPk(usuarioId);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  },


  // Endpoint para crear un nuevo usuario
  // createUser: async (req, res) => {
  //   try {
      // Aquí debes obtener los datos del nuevo usuario desde el cuerpo de la solicitud y crearlo en la base de datos
      // Puedes utilizar req.body para acceder a los datos enviados en el cuerpo de la solicitud

  //     const nuevoUsuario = await db.usuario.create(req.body);

  //     res.json(nuevoUsuario);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Error al crear un usuario' });
  //   }
  // },

  getCrear: (req, res) => {
    res.render('./user/crearUsuario')
},

  // Endpoint para crear un nuevo usuario
  createUser: async (req, res) => {
    try {
      const {
        nombre,
        apellido,
        username,
        email,
        fecha,
        pais,
        genero,
        password,
        confirmPassword,
        image
      } = req.body;

      // Crea un nuevo usuario en la base de datos
      const nuevoUsuario = await db.usuario.create({
        nombre,
        apellido,
        username,
        email,
        fecha,
        pais,
        genero,
        password,
        confirmPassword,
        image
      });

      res.json(nuevoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear un usuario' });
    }
  },

  // Endpoint para actualizar un usuario por su ID
  updateUser: async (req, res) => {
    try {
      const usuarioId = req.params.id;
      const usuario = await db.usuario.findByPk(usuarioId);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Aquí debes actualizar los datos del usuario con los valores proporcionados en req.body

      await usuario.update(req.body);

      res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  },

  // Endpoint para eliminar un usuario por su ID
  deleteUser: async (req, res) => {
    try {
      const usuarioId = req.params.id;
      const usuario = await db.usuario.findByPk(usuarioId);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Elimina el usuario de la base de datos
      await usuario.destroy();

      return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  },
};
