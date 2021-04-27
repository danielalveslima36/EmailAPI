import {Router} from 'express';
import StudentController from '../controllers/StudentController';
import SurveyController from '../controllers/SurveyController';
import SendEmailController from '../controllers/SendEmailController';
import AnswerController from '../controllers/AnswerController';
import SubjectController from '../controllers/SubjectController';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middleware/AuthMiddleware';



const router = Router();

// POST /subject
router.post('/subject', authMiddleware, SubjectController.create)

// GET /subject
router.get('/subject/:id', authMiddleware, SubjectController.get)

//POST /auth
router.post('/auth', AuthController.authenticate)

// POST /survey
router.post('/survey', SurveyController.create);

// POST /sendMail
router.post('/sendMail', SendEmailController.execute);

// GET/answers/:value
router.get('/answers/:value', AnswerController.execute);

// GET/nps/:survey_id
router.get('/nps/:survey_id', AnswerController.npsScore);


export {router}