import 'dotenv/config'

const PORT = process.env.PORT

const PostgreSQL = {
  database: {
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE
  }
}

export default {
  PORT,
  PostgreSQL
}
