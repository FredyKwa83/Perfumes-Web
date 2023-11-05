
// impide que si el usuario esta en session pueda acceder a registro o login 
function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/user/perfil');
	}
	next();
}

module.exports = guestMiddleware;