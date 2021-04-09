import { getCustomRepository } from 'typeorm';
import {Request, Response} from 'express';
import { SurveyStudentRepository } from '../repositories/SurveyStudentRepository';
class AnswerController{

    async execute(req: Request, res: Response): Promise<Response>{
        const {value} = req.params;
        const {id} = req.query;
        console.log(value)

        const surveyStudentRepository = getCustomRepository(SurveyStudentRepository);
        const surveyStudent  =  await surveyStudentRepository.findOne({id: String(id)})

        if(!surveyStudent){
            return res.status(400).json({error:'does not survey_user exists'});
        }
        surveyStudent.value = Number(value);
        await surveyStudentRepository.save(surveyStudent)
        return res.status(200).json(surveyStudent)
    }
}

export {AnswerController}