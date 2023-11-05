const { check, validationResult } = require('express-validator');

app.post('/registro', [
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  check('confirmPassword', 'Las contraseñas no coinciden').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden');
    }
    return true;
  }),
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Si hay errores de validación, muestra el formulario nuevamente con mensajes de error.
    return res.render('formulario', { errors: errors.array() });
  }

  // Si las contraseñas coinciden y no hay otros errores, procesa la solicitud y registra al usuario.
  // ...
});
