const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { check } = require('express-validator');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

var multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/img/imagen_perfil'));    // Ruta donde almacenamos el archivo
    },
   
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
        let imageName = `${Date.now()}_img${path.extname(file.originalname)}`;   // milisegundos y extensión de archivo original
        cb(null, imageName);         
       }
});

var uploadFile = multer({ storage: multerDiskStorage });

const userController = require('../controllers/userController');

const validateLogin = [ 
    
check('email') 
.notEmpty().withMessage('debes completar el email').bail()
.isEmail().withMessage('Debes completar un email válido'),

 check('password')
 .notEmpty().withMessage('Debes completar el password').bail()
 .isLength({ min: 8 }).withMessage('El password debe tener al menos 8 carateres'),

]

const validateRegistro = [ 

    check('nombre') 
    .notEmpty().withMessage('Debes completar tu nombre'),
    
    check('Apellido') 
    .notEmpty().withMessage('Debes completar tu Apellido'),
    
    check('username') 
    .notEmpty().withMessage('Debes completar tu usuario').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    check('email')
    .notEmpty().withMessage('debes completar el email').bail()
    .isEmail().withMessage('Debes completar un email válido'),
    
    check('fecha')
    .notEmpty().withMessage('Debes elegir una fecha'),
     
    check('pais')
    .notEmpty().withMessage('Debes elegir un pais'),

    check('genero')
    .notEmpty().withMessage('Debes elegir genero'),

    check('password')
    .notEmpty().withMessage('Debes completar el password').bail()
    .isLength({ min: 8 }).withMessage('El password debe tener al menos 8 carateres'),
    
    check('confirmPassword')
    .notEmpty().withMessage('Debes confirmar el password').bail()
    .isLength({ min: 8 }).withMessage('El password debe tener al menos 8 carateres'),

    check('image')
    .custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg",".png",".gif"];

        if(!file){
            throw new Error("tienes que subir una imagen");
        } else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`las extensiones de un archivo permitidas son ${acceptedExtensions.join(", ")}`);
            }
        }
        return true;
    }
    
    )
    ]


router.get('/login', userController.login);
router.post('/login', validateLogin, userController.postLogin); 

router.get('/perfil', authMiddleware, userController.perfil); 

router.get('/registro', guestMiddleware, userController.registro); 
router.post('/registro', uploadFile.single('image'), validateRegistro, userController.postRegistro); 

// cerrar sesion
router.get('/cerrar/', userController.cerrar);

module.exports = router;