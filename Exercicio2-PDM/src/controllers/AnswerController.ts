import { getCustomRepository } from 'typeorm';
import {Request, Response} from 'express';
import { SurveyStudentRepository } from '../repositories/SurveyStudentRepository';
import { SurveyRepository } from '../repositories/SurveyRepository';
class AnswerController{

    async execute(req: Request, res: Response): Promise<Response>{
        const {value} = req.params;
        const {su:id} = req.query;
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

    async npsScore(req: Request, res: Response): Promise<Response>{
        const {survey_id} = req.params;

        const surveyRepository = getCustomRepository(SurveyRepository)
        const surveyStudentRepository = getCustomRepository(SurveyStudentRepository);
        const survey = await surveyRepository.findOne({id: survey_id});
        if (!survey) {
            return res.status(400).json({error: 'Does not survey exists'})
        }

        const studentSurvey = await surveyStudentRepository.find({survey_id})

        const promotor = studentSurvey.filter(ss => ss.value >= 9)
                                        .map(ss => ss.value)
                                        .reduce((total, value) =>  total = total + value, 0);
        const detratores = studentSurvey.filter(ss => ss.value <= 6)
                                        .map(ss => ss.value)
                                        .reduce((total, value) =>  total = total + value, 0);

        const total = studentSurvey.map(ss => ss.value)
                                    .reduce((total, value) =>  total = total + value, 0);

        const npsScore = ((promotor - detratores) / total) * 100

        return res.status(200).json({nps: npsScore});
    }
}

export default new AnswerController()