import {
  loggedIn,
  login,
  logout,
  handleRegister,
  register,
} from '../controllers/auth.controller';
import { Router } from 'express';
import passport from 'passport';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import loggedInMiddleware from '../middlewares/logged-in.middleware';
import validatorMiddleware from '../middlewares/validator.middleware';

const authRouter = Router();

authRouter.get('/login', loggedInMiddleware, login);

authRouter.post(
  '/login',
  loggedInMiddleware,
  validatorMiddleware(LoginDTO),
  passport.authenticate('local'),
  loggedIn,
);

authRouter.get('/register', loggedInMiddleware, register);

authRouter.post(
  '/register',
  loggedInMiddleware,
  validatorMiddleware(RegisterDTO),
  handleRegister,
);

authRouter.get(
  '/github',
  loggedInMiddleware,
  passport.authenticate('github', { scope: ['user:email'] }),
);

authRouter.get(
  '/github/callback',
  loggedInMiddleware,
  passport.authenticate('github', {
    successRedirect: '/user/profile',
    failureRedirect: '/auth/login',
  }),
);

authRouter.get(
  '/google',
  loggedInMiddleware,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

authRouter.get(
  '/google/callback',
  loggedInMiddleware,
  passport.authenticate('google', {
    successRedirect: '/user/profile',
    failureRedirect: '/auth/login',
  }),
);

authRouter.get(
  '/facebook',
  loggedInMiddleware,
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  }),
);

authRouter.get(
  '/facebook/callback',
  loggedInMiddleware,
  passport.authenticate('facebook', {
    successRedirect: '/user/profile',
    failureRedirect: '/auth/login',
  }),
);

authRouter.get(
  '/twitter',
  loggedInMiddleware,
  passport.authenticate('twitter'),
);

authRouter.get(
  '/twitter/callback',
  loggedInMiddleware,
  passport.authenticate('twitter', {
    successRedirect: '/user/profile',
    failureRedirect: '/auth/login',
  }),
);

authRouter.post('/logout', logout);

export default authRouter;
