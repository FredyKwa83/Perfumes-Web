module.exports=
{
  "development": {
      "username": "kwa",
      "password": "12345", // Contraseña de tu base de datos, si la tiene
      "database": "db-perfumes",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "port":3306
    },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}


