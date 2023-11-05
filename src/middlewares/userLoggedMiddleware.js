
const User = require('../models/User');

// middle de aplicacion para quitar cosas de navbar
function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	
	//hace que al cerrar el navegador la sesion de abra automaticamente 
	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);

	//hace que al cerrar el navegador la sesion de abra automaticamente 
	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;