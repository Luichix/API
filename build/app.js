"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const consolidate_1 = __importDefault(require("./routes/consolidate"));
const employees_1 = __importDefault(require("./routes/employees"));
const hours_1 = __importDefault(require("./routes/hours"));
const payroll_1 = __importDefault(require("./routes/payroll"));
// const config = require('./utils/config')
// require('express-async-error')
const app = (0, express_1.default)();
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
app.use(express_1.default.static('build'));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// app.use(middleware.requestLogger)
// app.use('/api/users', usersRouter)
app.use('/api/employees', employees_1.default);
app.use('/api/hours', hours_1.default);
app.use('/api/consolidate', consolidate_1.default);
app.use('/api/payroll', payroll_1.default);
// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)
app.get('/', (_, res) => {
    res.send('Hello World');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
