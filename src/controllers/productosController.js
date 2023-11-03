const fs = require("fs");
const path = require("path");
const productosFilePath = path.join(__dirname, "../data/productos.json");
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));


// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {

    index: (req, res) => {
        // res.render('./productos/index', {productos});
        res.render("./productos/index", { productos: productos }); 
    },
    
    detail: function (req, res) {
        
        const id = req.params.id;

        const producto = productos.find(producto => producto.id == id)  /* encontrar un producto de la pagina lsa palabra find es la que lo hece funcionar*/
        if(producto) {
        res.render("./productos/detalleProducto", {producto});
    } else {
        res.send(`
        <div style= "text-align:center; padding-top:30px"> 
        <h1 style= "font-size: 80px" > El producto no existe </h1>
        <img style="width:30%" src="https://www.psicologo-palma-de-mallorca.es/coste-psicologico-nunca-decir-no.jpg" 
        </div>
        `)
    }
    },

    getEdit: (req, res) => {

        let id = req.params.id;

        const producto = productos.find(producto => producto.id == id);
    
        if (producto){
            res.render('./productos/editarProducto', {producto});
        }
        
    },

    putEdit: (req, res) => {

        let nombreImagen = req.file.filename;
    
        let id = req.params.id;
		
		for (let s of productos){
			if (id==s.id){
				s.nombre= req.body.nombre;
				s.precio= req.body.precio;
				s.descuento= req.body.descuento;
                s.descripcion=req.body.descripcion;
                s.image= nombreImagen;
				break;
			}
		}

		fs.writeFileSync(productosFilePath, JSON.stringify(productos,null,' '));

		res.redirect('/');
       
    },

    getCreateProduct: (req, res) => {
        res.render('./productos/crearProducto');
    },

    postCreateProduct: (req, res) => {

        let datosFormulario = req.body;
		let idProductoNuevo = (productos[productos.length-1].id)+1; // obtener un id (acordate por que +1)
		
        let nombreImagen = req.file.filename;
        console.log(nombreImagen)

		let objNuevoProducto = {
			id: idProductoNuevo,
			nombre: datosFormulario.nombre,
			precio: parseInt(datosFormulario.precio),
			descuento: parseInt(datosFormulario.descuento),
            descripcion: datosFormulario.descripcion,
			image: nombreImagen, 
		}

		productos.push(objNuevoProducto);

		fs.writeFileSync(productosFilePath, JSON.stringify(productos,null,' '));
        
		res.redirect('/'); // manda el producto al index
    },

    
    getDestroy: (req, res) => {

        let id = req.params.id;

        const producto = productos.find(producto => producto.id == id);
    
        if (producto){
            res.render('./productos/eliminarProducto', {producto});
        }
        
    },


    deleteDestroy: (req, res) => {
        
        let id = req.params.id;
        let productoParaEliminar;
        
        let productosNoEliminados = productos.filter(function(e){
            return id!= e.id;
        })

        for (let product of productos){
            if (product.id == id){
                productoParaEliminar = product;
            }
        }

    fs.unlinkSync(path.join(__dirname, "../../public/img/imagen_llegada/", productoParaEliminar.image))

    fs.writeFileSync(productosFilePath, JSON.stringify(productosNoEliminados,null,' '));

	res.redirect('/');

}


};

module.exports = productsController;