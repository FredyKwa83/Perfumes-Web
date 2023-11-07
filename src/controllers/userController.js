// const bcryptjs = require("bcryptjs"); 
// const { validationResult } = require('express-validator');
// const User = require("../models/User");
// const userController = {

//     login: (req, res) => {
//         res.render('./user/login')
//     },

//     postLogin:(req, res) => {
//         // let errors = validationResult(req);
//         // if (errors.isEmpty()) {

//         // } else {
//         //     // Hay errores, volvemos al formulario con los mensajes
//         //     res.render('./user/login', { errors: errors.mapped(), oldData: req.body });
//         //     };

//         let userToLogin = User.findByField("email", req.body.email);
//             if(userToLogin) {
//                 let passwordCorrecta = bcryptjs.compareSync(req.body.password, userToLogin.password);
//                 if(passwordCorrecta){
//                     delete userToLogin.password; // eliminar el password
//                     req.session.userLogged = userToLogin  // guardar el usuario en login hasta que se cierre el navegador
                    
//                     //para mantener la sesion con la cookie
//                     if(req.body.remember_user) {
//                         res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
//                     }

//                     return res.redirect("/user/perfil");
//                 }

//                 return res.render("./user/login", {
//                     errors: {
//                         email: {
//                             msg: "las credenciales no son validas"
//                         }
//                     }
//                 });
//             }

//             return res.render("./user/login", {
//                 errors: {
//                     email: {
//                         msg: "no se encuentra este email en la base de datos"
//                     }
//                 }
//             })
//     },

//     perfil: (req, res) => {
//         return res.render('./user/perfil', {
// 			user: req.session.userLogged
// 		})},
    
//     registro: (req, res) => {
//         res.cookie("testing", "hola mundo", {maxAge: 1000 * 30})
//         res.render('./user/registro')
//     },

//     postRegistro:(req, res) => {

//         let errors = validationResult(req);
//         if (errors.isEmpty()) {

//         } else {
//             // Hay errores, volvemos al formulario con los mensajes
//             res.render('./user/registro', { errors: errors.mapped(), oldData: req.body });
//             } 

//         // para mostrar error por usar un email ya registrado
//         let userInDB = User.findByField("email", req.body.email);
//         if(userInDB) {
//             return res.render("./user/registro", {
//                   errors: {
//                     email: {
//                         msg: "el email ya esta registrado"
//                     },
                   
//                   },
//                   oldData: req.body
//             });
//         }

//         let userToCreate = {
//             ...req.body,
//             password:bcryptjs.hashSync(req.body.password, 10),
//             confirmPassword:bcryptjs.hashSync(req.body.confirmPassword, 10),
//             image: req.file.filename
//         }


//         let userCreated = User.create(userToCreate);   
// 		return res.redirect('/user/login');    
//     },
    
//     cerrar: (req, res) => {
// 		// res.clearCookie('userEmail');
// 		req.session.destroy();
// 		return res.redirect('/');
// 	}
    
// }

// module.exports = userController;

//////////////////////////////////////////////////////////

// const bcryptjs = require("bcryptjs");
// const { validationResult } = require('express-validator');
// const Usuario = require("../data/models");

// const userController = {
//   // ... Otras funciones del controlador ...

//   registro: (req, res) => {
//                 res.render('./user/registro');
//        },

//   postRegistro: async (req, res) => {
//     const errores = validationResult(req);

//     if (!errores.isEmpty()) {
//       return res.render('./user/registro', { errores: errores.mapped(), oldData: req.body });
//     }

//     try {
//       const userInDB = await Usuario.findOne({ where: { correo_electronico: req.body.email } });

//       if (userInDB) {
//         return res.render('./user/registro', { errores: { correo_electronico: { mensaje: 'El email ya está registrado' } }, oldData: req.body });
//       }

//       const usuarioCreado = await Usuario.create({
//         nombre: req.body.nombre,
//         apellido: req.body.apellido,
//         nombre: req.body.nombre,
//         email: req.body.email,
//         fecha: req.body.fecha,
//         pais: req.body.pais,
//         genero: req.body.genero,
//         password: bcryptjs.hashSync(req.body.password, 10),
//         confirmPassword: bcryptjs.hashSync(req.body.confirmPassword, 10),
//         // imagen: req.file.filename,
//       });

//       return res.redirect('/user/perfil');
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send('Error en el servidor');
//     }
//   },

//   // ... Otras funciones del controlador ...
// };

// module.exports = userController;


///////////////////////////////////////////////////////

const fs = require('fs');
const path = require('path');

const {validationResult} = require('express-validator');

const db = require('../data/models')

const cloudinary = require('cloudinary');
const streamifier = require('streamifier');

const bcrypt = require('bcryptjs');
const { name } = require('ejs');

cloudinary.config ({
    cloud_name: 'djdehtaic',
    api_key: '562794885344328',
    api_secret: 'P6oex-8Xlbv4-IgAr8C1SS03SO0',
})

const userController ={

    detalleUsuario: async (req, res) => {
        try {
            const usuario = await db.usuario.findByPk(req.params.id);

            if (usuario) {
                res.render('./user/detalleUsuarios', { usuario }); // Renderiza una vista para mostrar los detalles del usuario
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    },

    obtenerTodosLosUsuarios: async (req, res) => {
        try {
            const usuarios = await db.usuario.findAll();
            res.render('./user/indexUsuarios', { usuarios }); // Cambia 'vista_usuarios' al nombre de tu vista
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
    },

  
  
    registro: (req, res) => {
            res.render('./user/registro');
    },

	postRegistro: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) { 
            return res.render('./user/registro' , {errors: resultValidation.mapped() , old : req.body})
        } else {

            const imagePath = req.file.path;

            db.usuario.create({
                nombre: req.body.nombre,
                apellido:req.body.apellido,
                username: req.body.username,
                email: req.body.email,
                fecha: req.body.fecha,
                pais:req.body.pais,
                genero:req.body.genero,
                password: bcrypt.hashSync(req.body.password, 10),
                confirmPassword:bcrypt.hashSync(req.body.confirmPassword, 10),
                image: imagePath
            })

            res.render('./user/login'); 

		}
	},

    login :(req, res) => {
        res.render('./user/login');
    },

	postLogin : async(req, res) => {

        
        try {
            const resultValidation = validationResult(req)
            if (resultValidation.errors.length > 0) {
                return res.render('./user/perfil', {
                    errors: resultValidation.mapped(),
                    old : req.body
                });
            }
            const userToLogin = await db.usuario.findOne({where: {email: req.body.email}});
            if(!userToLogin){
                return res.render('./user/login', {
                    errors: {email: {msg: 'El usuario con el que intenta ingresar no existe'}}
                });
            }
            const correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (correctPassword){
                req.session.userLogged = userToLogin;
                return res.redirect("/user/perfil");
            
            } else { 
                return res.render('./user/login' , {
                    errors: {password: {msg: 'Contraseña incorrecta'}}, old : req.body
                });


                
            }
            }catch (error) { 
                console.log(error.message); 
            }
	},

    perfil: (req, res) => {
        const userLogged = req.session.userLogged;
      
        if (userLogged) {
          res.render('./user/perfil', { userLogged });
        } else {
          // Manejar el caso en el que el usuario no esté autenticado
          res.redirect('/user/login'); // Redirige al usuario a la página de inicio de sesión
        }
      }, 
      
      cerrar: (req, res) => {
        req.session.destroy((err) => {
          if (err) {
            console.error('Error al cerrar la sesión:', err);
          }
          // Redirige al usuario a la página de inicio o a donde desees
          res.redirect('/');
        });
      }
      
    }


module.exports = userController;