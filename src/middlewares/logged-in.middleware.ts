import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

async function loggedInMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const userService = new UserService();
  if (request.isAuthenticated() && request.user) {
    try {
      const id = (request.user as User).id || 0;
      const user = await userService.findByUserId(id);
      if (user) {
        request.user = user;
        response.redirect('/');
      } else {
        next();
      }
    } catch (error) {
      next();
    }
  } else {
    next();
  }
}

export default loggedInMiddleware;
