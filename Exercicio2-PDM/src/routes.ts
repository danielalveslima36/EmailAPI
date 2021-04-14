import {Router} from 'express';
import {StudentController} from './controllers/StudentController';
import {SurveyController} from './controllers/SurveyController';
import {SendEmailController} from './controllers/SendEmailController';
import { AnswerController } from './controllers/AnswerController';
import { SubjectController } from './controllers/SubjectController';


const router = Router();
const studentController =  new StudentController();
const surveyController = new SurveyController();
const sendEmailController = new SendEmailController();
const answerController = new AnswerController();
const subjectController = new SubjectController();

// POST /user
router.post('/user', studentController.create)

// GET /user
router.get('/user', studentController.list)

// GET /user/:id
router.get('/user/:id', studentController.get)

// POST /subject
router.post('/subject', subjectController.create)

// POST /survey
router.post('/survey', surveyController.create);

// POST /sendMail
router.post('/sendMail', sendEmailController.execute);

// GET/answers/:value
router.get('/answers/:value', answerController.execute);

// GET/nps/:survey_id
router.get('/nps/:survey_id', answerController.npsScore);


export {router}