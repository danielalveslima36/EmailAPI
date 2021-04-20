import "reflect-metadata";
import express from 'express';
import createConnection  from  "./database"
import {router} from './route/routes'
import studentRouter from "./route/studentRouter";

createConnection()
const app = express()
app.use(express.json());
app.use(studentRouter)
app.use(router);

export {app}