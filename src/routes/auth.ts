import express from 'express'
import * as controller from '../controllers/auth' 
import { createUser, loginUser } from '../validation/auth'

const router = express.Router();

router.post('/signup', createUser, controller.signup);
router.post('/login', loginUser, controller.login);
router.get('/logout', controller.logout);

export default router;