import {Request, Response} from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { StudentRepository } from '../repositories/StudentRepositoriy';
import { SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController{
    async create(req: Request, res: Response): Promise<Response>{
        const {title, description} = req.body;
        
        const surveyRepository = getCustomRepository(SurveyRepository)
        const survey = surveyRepository.create({title, description})
        await surveyRepository.save(survey)

        return res.status(200).json(survey)
    }
}

export { SurveyController };