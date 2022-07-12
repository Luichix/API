// const config = require('./utils/config')
import express from 'express'
// require('express-async-error')
const app = express()
// const cors = require('cors')
// const usersRouter = require('./controllers/user')
// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')
// const { pool } = require('./api/pool')

// logger.info('connecting to', config.MySQL.database.database)

// pool.getConnection(function (error) {
//   if (error) {
//     logger.error('error connecting to MySQL', error.stack)
//     return
//   }
//   logger.info('connecting to MySQL')
// })

// app.use(cors())
app.use(express.static('build'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
// app.use(middleware.requestLogger)

// app.use('/api/users', usersRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

export default app
