const express = require("express");
const router = express.Router()
const productosController= require("../controllers/productosController")
  
//crear ruta raiz
router.get("/", productosController.index)
router.get("/crear", productosController.crear)
  









module.exports = router;