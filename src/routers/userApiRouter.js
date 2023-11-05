const express = require('express');
const router = express.Router();
const userApiController = require('../controllers/userApiController');


router.get("/", userApiController.list)
router.get("/search", userApiController.buscar)
// router.delete('/:id', userApiController.eliminarUsuario);
router.delete('/:id', userApiController.eliminar);
// router.get("/:id", apiController.mostrar)
// router.post("/", apiController.crear)
// router.delete("/:id", apiController.eliminar)

module.exports = router;