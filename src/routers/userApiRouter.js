const express = require('express');
const router = express.Router();
const userApiController = require('../controllers/userApiController');

// Ruta para obtener todos los usuarios
router.get('/usuarios', userApiController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', userApiController.getUserById);

// Ruta para crear un nuevo usuario
router.get('/crearUsuario', userApiController.getCrear);  //nuevo
router.post('/crearUsuario', userApiController.createUser);


// Ruta para actualizar un usuario por su ID
router.put('/usuarios/:id', userApiController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/usuarios/:id', userApiController.deleteUser);

module.exports = router;
