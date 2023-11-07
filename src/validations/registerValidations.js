const {body} = require('express-validator');

let registerValidations = [
    body('nombre')
        .notEmpty().withMessage('El campo está vacío'),
    body('Apellido')
        .notEmpty().withMessage('El campo está vacío'),
    body('username')
        .notEmpty().withMessage('El campo está vacío'),
    body('email')
        .isEmail().withMessage('Debes escribir un correo válido')
];

module.exports = registerValidations