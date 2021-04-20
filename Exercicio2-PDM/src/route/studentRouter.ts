import {Router} from 'express';
import StudentController from '../controllers/StudentController';
import authMiddleware from '../middleware/AuthMiddleware';

const studentRouter = Router()

studentRouter.use(authMiddleware)

// POST /user
studentRouter.post('/user', StudentController.create)

// GET /user
studentRouter.get('/user', StudentController.list)

// GET /user/:id
studentRouter.get('/user/:id', StudentController.get)

export default studentRouter