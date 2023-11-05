const bcryptjs = require("bcryptjs"); 
const { validationResult } = require('express-validator');
const User = require("../models/User");
const userController = {

    login: (req, res) => {
        res.render('./user/login')
    },

    postLogin:(req, res) => {
        // let errors = validationResult(req);
        // if (errors.isEmpty()) {

        // } else {
        //     // Hay errores, volvemos al formulario con los mensajes
        //     res.render('./user/login', { errors: errors.mapped(), oldData: req.body });
        //     };

        let userToLogin = User.findByField("email", req.body.email);
            if(userToLogin) {
                let passwordCorrecta = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if(passwordCorrecta){
                    delete userToLogin.password; // eliminar el password
                    req.session.userLogged = userToLogin  // guardar el usuario en login hasta que se cierre el navegador
                    
                    //para mantener la sesion con la cookie
                    if(req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }

                    return res.redirect("/user/perfil");
                }

                return res.render("./user/login", {
                    errors: {
                        email: {
                            msg: "las credenciales no son validas"
                        }
                    }
                });
            }

            return res.render("./user/login", {
                errors: {
                    email: {
                        msg: "no se encuentra este email en la base de datos"
                    }
                }
            })
    },

    perfil: (req, res) => {
        return res.render('./user/perfil', {
			user: req.session.userLogged
		})},
    
    registro: (req, res) => {
        res.cookie("testing", "hola mundo", {maxAge: 1000 * 30})
        res.render('./user/registro')
    },

    postRegistro:(req, res) => {

        let errors = validationResult(req);
        if (errors.isEmpty()) {

        } else {
            // Hay errores, volvemos al formulario con los mensajes
            res.render('./user/registro', { errors: errors.mapped(), oldData: req.body });
            } 

        // para mostrar error por usar un email ya registrado
        let userInDB = User.findByField("email", req.body.email);
        if(userInDB) {
            return res.render("./user/registro", {
                  errors: {
                    email: {
                        msg: "el email ya esta registrado"
                    },
                   
                  },
                  oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password:bcryptjs.hashSync(req.body.password, 10),
            confirmPassword:bcryptjs.hashSync(req.body.confirmPassword, 10),
            image: req.file.filename
        }


        let userCreated = User.create(userToCreate);   
		return res.redirect('/user/login');    
    },
    
    cerrar: (req, res) => {
		// res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
    
}

module.exports = userController;