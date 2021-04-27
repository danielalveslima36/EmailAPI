import { getCustomRepository } from 'typeorm';
import { Request, response, Response } from 'express';
import { SubjectRepository } from '../repositories/SubjectRepository';
import { StudentSubjectRepository } from '../repositories/StudentSubjectRepository';
import { Subject } from '../models/Subject';

class SubjectController {

    async create(req: Request, res: Response): Promise<Response> {
        const { name, workload } = req.body;

        const subjectRepository = getCustomRepository(SubjectRepository)
        const subject = subjectRepository.create({
            name,
            workload
        });
        await subjectRepository.save(subject)

        return res.status(200).json(subject)
    }

    async get(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const studentSubjectRepository = getCustomRepository(StudentSubjectRepository)
        const subjectRepository = getCustomRepository(SubjectRepository)

        const subjects = await studentSubjectRepository.find()
        if (!subjects) {
            return res.status(400).json({ error: 'Subjects does not exists' })
        } else {
            const subjectsArray: Subject[] = [];
            for (const subject of subjects) {
                const aux = await subjectRepository.findOne(subject.subject_id)
                subjectsArray.push(aux)
            }
            return res.status(200).json(subjectsArray)
        }
    }
}

export default new SubjectController()