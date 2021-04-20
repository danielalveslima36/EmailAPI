import {Request, Response} from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { Student } from '../models/Student';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../config/auth'
class AuthController {
    
    async authenticate(req: Request, res:Response){
        const {email, password} = req.body;
        const authRepository = getRepository(Student)
        const student = await authRepository.findOneOrFail({email})

        if(!student) return res.status(401)

        const isValid = bcryptjs.compareSync(password, student.password)

        if(!isValid) return res.status(401)

        const token = jwt.sign({id:student.id, name:student.name}, auth.jwt.secret, {expiresIn:'1d'})

        return res.json({
            student,
            token
        })

    }
}

export default new AuthController()