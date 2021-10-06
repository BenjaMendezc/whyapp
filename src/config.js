require('dotenv').config()
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DIALECT
} = process.env

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'whyapp',
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging:false,
    native:false
  }
}