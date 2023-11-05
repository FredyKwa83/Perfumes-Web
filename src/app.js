const express = require("express");
const session = require("express-session")
const cookies = require("cookie-parser")
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../public/")));

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// CREAR SESSION DE USUARIO SEGURA
app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(userLoggedMiddleware);

// PARA ENVIAR INFORMACION POR POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

// para poder sobreescribir el método original y poder implementar los 
//métodos PUT o DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

//creacion de rutas raiz
const indexRouter = require("./routers/productosRouters")
app.use("/", indexRouter)
  
// SE CREO PARA VISTAS DE USUARIOS
const userRouter = require("./routers/userRouters");
app.use("/user", userRouter);

const userApiRouter = require('./routers/userApiRouter')
app.use('/user/api/', userApiRouter);

//ESTE MILDWARE HAY QUE PONERLO AL FINAL
app.use((req, res, next) => {
  res.status(404).render('error')
})

  app.listen(3000, ()=>{
    console.log("servidor corriendo http://localhost:3000")
})

module.exports = app;