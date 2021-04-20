import { getCustomRepository } from 'typeorm';
import {Request, Response} from 'express';
import { SubjectRepository } from '../repositories/SubjectRepository';

class SubjectController {

    async create(req: Request, res: Response): Promise<Response>{
        const {name, workload} = req.body;

        const subjectRepository = getCustomRepository(SubjectRepository)
        const subject =  subjectRepository.create({
            name, 
            workload
        });
        await subjectRepository.save(subject)

        return res.status(200).json(subject)
    }
}

export default new SubjectController()