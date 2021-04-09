import {Router} from 'express';
import {StudentController} from './controllers/StudentController';
import {SurveyController} from './controllers/SurveyController';
import {SendEmailController} from './controllers/SendEmailController';
import { AnswerController } from './controllers/AnswerController';


const router = Router();
const studentController =  new StudentController();
const surveyController = new SurveyController();
const sendEmailController = new SendEmailController();
const answerController = new AnswerController();

router.post('/user', studentController.create)

router.post('/survey', surveyController.create);

router.post('/sendMail', sendEmailController.execute);

router.get('/answers/:value', answerController.execute);


export {router}