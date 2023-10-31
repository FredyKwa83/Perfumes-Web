const express = require("express");
const router = express.Router()
const productosController= require("../controllers/productosController")
  
//crear ruta raiz
router.get("/", productosController.index)

router.get("/crear", productosController.crear)

router.get("/detalle", productosController.detalle)

router.get("/editar", productosController.editar)

router.get("/eliminar", productosController.eliminar)




  









module.exports = router;