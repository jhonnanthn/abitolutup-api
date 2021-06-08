import express from 'express'
import 'express-async-errors'
import './database/connection'
import routes from './routes'
import cors from 'cors'
import { config } from 'dotenv'

import errorHandler from './errors/handler'

const app = express();
console.log("--------------------")
console.log("Start time: "+new Date())
console.log("Environment: "+ process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development') {
    // Carrega .env se não for prod ou dev (remoto)
    config();
}
console.log("Server - sd-backend -  starting on port :"+process.env.NODE_PORT+"...")
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(routes);
app.use(errorHandler);
app.listen(parseInt(process.env.NODE_PORT || ""), "0.0.0.0");

console.log("Server - sd-backend -  started successfully!!!")