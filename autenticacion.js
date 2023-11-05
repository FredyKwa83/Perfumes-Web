// Importa Sequelize y la configuración de la base de datos
const Sequelize = require('sequelize');
const config = require('./config/config.json'); // Asegúrate de que la ruta sea correcta

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Crea una instancia de Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  define: dbConfig.define // Opcional, para utilizar nombres de columna en snake_case
});

// Intenta autenticar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Exporta la instancia de Sequelize
module.exports = sequelize;
