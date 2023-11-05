module.exports = (sequelize, DataTypes) => {
        const Usuario = sequelize.define("usuario", {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          nombre: {
            type: DataTypes.STRING(50)
          },
          apellido: {
            type: DataTypes.STRING(50)
          },
          username: {
            type: DataTypes.STRING(50)
          },
          email: {
            type: DataTypes.STRING(50)
          },
          fecha: {
            type: DataTypes.DATE
          },
          pais: {
            type: DataTypes.STRING(250)
          },
          genero: {
            type: DataTypes.STRING(250)
          },
          password: {
            type: DataTypes.STRING(250)
          },
          confirmPassword: {
            type: DataTypes.STRING(250)
          },
          image: {
            type: DataTypes.STRING(1500)
          }
        }, {
          tableName: 'usuarios', // Reemplaza "nombre_de_la_tabla" por el nombre real de la tabla
          timestamps: false
        });
      
        return Usuario;
      }
      

