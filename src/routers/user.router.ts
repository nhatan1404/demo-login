import { Router } from 'express';
import { showProfile } from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/profile', authMiddleware, showProfile);

export default userRouter;
