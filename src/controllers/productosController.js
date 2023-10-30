const fs = require("fs");
const path = require("path");
// const productosFilePath = path.join(__dirname, "../data/dataBase.json");
// const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productosController = {
    index:(req,res)=>{
        res.render("./productos/index")
    }
    

}
module.exports = productosController;