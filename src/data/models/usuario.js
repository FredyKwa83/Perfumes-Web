// module.exports = (sequelize, DataTypes) => {

//     let alias = "usuario";

//     let cols = {
//         id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
//         nombre: {type: Datatypes.STRING(50)},
//         apellido: {type: Datatypes.STRING(50)},
//         username:{type: Datatypes.STRING(50)},
//         email: {type: Datatypes.STRING(50)},
//         fecha: {type: Datatypes.DATE},
//         pais:{type: Datatypes.STRING(250)},
//         genero:{type: Datatypes.STRING(250)},
//         password:{type: Datatypes.STRING(250)},
//         image: {type: Datatypes.STRING(1500)}   
//     }


//     let config = {
//         tableName: "usuarios",
//         timestamps: false
//     }
    
//   const usuario = sequelize.define(alias, cols, config);
// return usuario;
// }

module.exports = (sequelize, DataTypes) => {
    const usuario = sequelize.define("Pelicula",
       {
        
                   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
                    nombre: {type: DataTypes.STRING(50)},
                     apellido: {type: DataTypes.STRING(50)},
                     username:{type: DataTypes.STRING(50)},
                     email: {type: DataTypes.STRING(50)},
                     fecha: {type: DataTypes.DATE},
                     pais:{type: DataTypes.STRING(250)},
                     genero:{type: DataTypes.STRING(250)},
                     password:{type: DataTypes.STRING(250)},
                     image: {type: DataTypes.STRING(1500)}   
                
       },
       {
          tableName: 'movies',
  //Si el nombre de la tabla no coincide con el del modelo
          timestamps: false, 
  //Si no tengo timestamps
       });
 
    return usuario;
}
