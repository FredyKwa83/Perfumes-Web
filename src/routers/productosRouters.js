const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

var multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/img/imagen_llegada'));    // Ruta donde almacenamos el archivo
    },
   
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
        let imageName = `${Date.now()}_img${path.extname(file.originalname)}`;   // milisegundos y extensión de archivo original
        cb(null, imageName);         
       }
});

var uploadFile = multer({ storage: multerDiskStorage });


const productsController = require('../controllers/productosController');

router.get('/', productsController.index); 

router.get('/detail/:id', productsController.detail); 

router.get ('/edit/:id', productsController.getEdit);
router.put ('/edit/:id', uploadFile.single('image'), productsController.putEdit);

router.get('/createProduct', productsController.getCreateProduct); 
router.post('/createProduct', uploadFile.single('image'), productsController.postCreateProduct); 

router.get('/delete/:id', productsController.getDestroy);
router.delete('/delete/:id', uploadFile.single('image'), productsController.deleteDestroy);



module.exports = router;