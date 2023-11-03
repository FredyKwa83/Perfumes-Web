const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../public/")));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

// para poder sobreescribir el método original y poder implementar los 
//métodos PUT o DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

//creacion de rutas raiz
const indexRouter = require("./routers/productosRouters")
app.use("/", indexRouter)
  
// const userRouter= require("./routers/userRouters")
// app.use("/user", userRouter)  

//ESTE MILDWARE HAY QUE PONERLO AL FINAL
app.use((req, res, next) => {
  res.status(404).render('error')
})

  app.listen(3000, ()=>{
    console.log("servidor corriendo http://localhost:3000")
})

module.exports = app;