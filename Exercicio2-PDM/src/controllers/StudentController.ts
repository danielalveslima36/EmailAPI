import {Request, Response} from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { StudentSubject } from '../models/StudentSubject';
import { Subject } from '../models/Subject';
import { StudentRepository } from '../repositories/StudentRepositoriy';
import { StudentSubjectRepository } from '../repositories/StudentSubjectRepository';
import { SubjectRepository } from '../repositories/SubjectRepository';

class StudentController{
    async create(req: Request, res: Response): Promise<Response>{
        const {name, email, subjects} = req.body;

        const studentRepository = getCustomRepository(StudentRepository)
        const subjectRepository = getCustomRepository(SubjectRepository)
        const studentSubjectRepository = getCustomRepository(StudentSubjectRepository)
        
        const studentAlreadyExists = await studentRepository.findOne({email})
        if (studentAlreadyExists) {
            return res.status(400).json({error:'Student already exists'})
        }

        const student = studentRepository.create({
            name,
            email,
        });
        await studentRepository.save(student);

        const subjectsArray: Subject[] = [];
        subjects.forEach(subject => {
            const subjectObj = subjectRepository.create(
                {name: subject.name, workload: subject.workload}
            );

            subjectsArray.push(subjectObj);
        })
        await subjectRepository.save(subjectsArray);

        const studentSubjectArray: StudentSubject[] = [];
        for(const subject of subjectsArray) {
            const studentSubjectItem = studentSubjectRepository.create({
                subject_id: subject.id,
                student_id: student.id
            });

            studentSubjectArray.push(studentSubjectItem);
        }

        return res.status(200).json(studentSubjectArray)
    }

    async list(req: Request, res: Response): Promise<Response> {
        const studentRepository = getCustomRepository(StudentRepository) 
        const listStudents = await studentRepository.find()

        return res.status(200).json(listStudents)
    }

    async get(req: Request, res: Response): Promise<Response> {
        const {id} = req.params

        const studentRepository = getCustomRepository(StudentRepository) 

        const student = await studentRepository.findOne({id})
        if (!student) {
            return res.status(400).json({error:'Student not exists'})
        }
                
        return res.status(200).json(student)
    }

}

export { StudentController };