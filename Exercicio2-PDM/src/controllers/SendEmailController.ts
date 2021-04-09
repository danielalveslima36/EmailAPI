import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { StudentRepository } from '../repositories/StudentRepositoriy';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyStudentRepository } from '../repositories/SurveyStudentRepository';
import {resolve} from 'path';
import { title } from 'process';
import SendEmailService from '../services/SendEmailService';

class SendEmailController{
    async execute(req: Request, res: Response): Promise<Response>{
        const { email, survey_id } = req.body;
        const studentRepository = getCustomRepository(StudentRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyStudentRepository = getCustomRepository(SurveyStudentRepository);

        const studentExists = await studentRepository.findOne({email});
        if(!studentExists){
            return res.status(400).json({error: 'does not student exists'})
        }

        const surveyExists = await surveyRepository.findOne({id: survey_id});
        if(!surveyExists){
            return res.status(400).json({error: 'does not survey exists'})
        }

        const path = resolve(__dirname,"..",'views','emails', 'npsEmail.hbs');

        const variables = {
            name:studentExists.name,
            title:surveyExists.title,
            description: surveyExists.description,
            link: process.env.URL_MAIL,
            id: ''
        }

        const surveyStudentExists = await surveyStudentRepository.findOne({
            where: {student_id: studentExists.id, value: null},
            relations: ['student', 'survey'],
        });
        if (surveyStudentExists) {
            variables.id = surveyStudentExists.id
            await SendEmailService.execute(email, surveyExists.title, variables, path);
            return res.status(200).json(surveyStudentExists);
        }

        const surveyStudent = surveyStudentRepository.create({student_id: studentExists.id, survey_id})
        await surveyStudentRepository.save(surveyStudent)

        variables.id = surveyStudent.id
        await SendEmailService.execute(email, surveyExists.title, variables, path)

        return res.status(200).json(surveyStudent);



        
    }
}

export { SendEmailController };