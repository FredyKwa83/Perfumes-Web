
// // si no tengo a nadie en sesion redirige al formulario de login
// function authMiddleware(req, res, next) {
// 	if (!req.session.userLogged) {
// 		return res.redirect('/user/login');
// 	}
// 	next();
// }

// module.exports = authMiddleware;

// authMiddleware.js
function authMiddleware(req, res, next) {
	if (req.session.userLogged) {
		// El usuario está autenticado; puedes acceder a él como req.session.userLogged
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
		return next();
	}
	res.locals.isLogged = false;
	next();
}

module.exports = authMiddleware;
