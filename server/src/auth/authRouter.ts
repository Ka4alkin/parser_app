import { getUsers, login, registration } from './authController';
import { Router } from 'express';
import { authMiddleWare } from '../middlewares';


const router = Router();

router.post('/registration', registration);
router.post('/login', login);
router.get( '/users', authMiddleWare, getUsers);

module.exports = router;
