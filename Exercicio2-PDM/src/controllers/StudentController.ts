import {Request, Response} from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { StudentRepository } from '../repositories/StudentRepositoriy';

class StudentController{
    async create(req: Request, res: Response): Promise<Response>{
        const {name, email} = req.body;
        const studentRepository = getCustomRepository(StudentRepository)
        const studentAlreadyExists = await studentRepository.findOne({email})
        if (studentAlreadyExists) {
            return res.status(400).json({error:'Student already exists'})
        }

        const student = studentRepository.create({
            name,
            email,
        });
        await studentRepository.save(student);
        return res.status(200).json(student)
    }
}

export { StudentController };