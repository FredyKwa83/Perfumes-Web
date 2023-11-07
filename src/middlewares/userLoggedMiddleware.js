
// const usuario = require('../data/models');

// // middle de aplicacion para quitar cosas de navbar
// function userLoggedMiddleware(req, res, next) {
// 	res.locals.isLogged = false;
	
// 	//hace que al cerrar el navegador la sesion de abra automaticamente 
// 	let emailInCookie = req.cookies.userEmail;
// 	let userFromCookie = usuario.findByField('email', emailInCookie);

// 	//hace que al cerrar el navegador la sesion de abra automaticamente 
// 	if (userFromCookie) {
// 		req.session.userLogged = userFromCookie;
// 	}

// 	if (req.session.userLogged) {
// 		res.locals.isLogged = true;
// 		res.locals.userLogged = req.session.userLogged;
// 	}

// 	next();
// }

// module.exports = userLoggedMiddleware;

// const User = require('../data/models');

// // Define the findByField function in your User model
// User.findByField = async function (field, value) {
//   try {
//     const user = await this.findOne({ where: { [field]: value } });
//     return user;
//   } catch (error) {
//     throw new Error("Error finding user by field: " + error.message);
//   }
// };

// async function userLoggedMiddleware(req, res, next) {
//   res.locals.isLogged = false;

//   // Get the email from the cookies
//   let emailInCookie = req.cookies.userEmail;
  
//   try {
//     // Use await to wait for the promise returned by User.findByField
//     const user = await User.findByField('email', emailInCookie);

//     if (user) {
//       req.session.userLogged = user;
//     }

//     if (req.session.userLogged) {
//       res.locals.isLogged = true;
//       res.locals.userLogged = req.session.userLogged;
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   next();
// }

// module.exports = userLoggedMiddleware;

// Importa tu modelo de usuario
// const Usuario = require('../data/models/usuario'); // Reemplaza la ruta con la ubicación real de tu modelo

// async function userLoggedMiddleware(req, res, next) {
//   res.locals.isLogged = false;

//   // Get the email from the cookies
//   let emailInCookie = req.cookies.userEmail;
  
//   try {
//     // Use await to wait for the promise returned by Usuario.findOne
//     const user = await Usuario.findOne({ where: { email: emailInCookie } });

//     if (user) {
//       req.session.userLogged = user;
//     }

//     if (req.session.userLogged) {
//       res.locals.isLogged = true;
//       res.locals.userLogged = req.session.userLogged;
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   next();
// }

// module.exports = userLoggedMiddleware;

const db = require('../data/models/usuario'); // Asegúrate de que la ruta sea correcta
const Usuario = db.usuario; // Usa el nombre exacto del modelo

const userLoggedMiddleware = async (req, res, next) => {
  if (req.session.userLoggedId) {
    try {
      const user = await Usuario.findOne({
        where: { id: req.session.userLoggedId },
      });

      if (user) {
        res.locals.userLogged = user;
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
    }
  }

  next();
};

module.exports = userLoggedMiddleware;
