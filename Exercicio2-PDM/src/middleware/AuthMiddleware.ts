import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import auth from '../config/auth'
interface Payload{
    id:number;
    name:string;
}

export default function authMiddleware(req:Request, res:Response, next:NextFunction){
    const {authorization} = req.headers
    if (!authorization) {
        return res.sendStatus(401)
    }
    const token = authorization.replace('Bearer', '').trim()
    try {
        const data = jwt.verify(token, auth.jwt.secret)
        const {id, name} = data as Payload
        req.user = {id,name}
        return next();
    } catch (error) {
        return res.sendStatus(401)
    }
}