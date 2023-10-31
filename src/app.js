const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../public/")));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

//creacion de rutas raiz
const productosRouter= require("./routers/productosRouters")
app.use("/", productosRouter)
  
// const userRouter= require("./routers/userRouters")
// app.use("/user", userRouter)  

  app.listen(3000, ()=>{
    console.log("servidor corriendo http//:localhost:3000")
})

module.exports = app;