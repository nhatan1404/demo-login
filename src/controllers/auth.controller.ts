import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { ProviderType } from '../entities/user.entity';
import BadRequestException from '../exceptions/badrequest.exception';
import HttpException from '../exceptions/http.exception';
import { UserService } from '../services/user.service';

export const login = (req: Request, res: Response) => {
  res.render('auth/login', {
    title: 'Đăng Nhập',
  });
};

export const loggedIn = (req: Request, res: Response) => {
  res.json(new HttpException('Login successfully', 200));
};

export const register = (req: Request, res: Response) => {
  res.render('auth/register', {
    title: 'Đăng Ký',
  });
};

export const handleRegister = async (req: Request, res: Response) => {
  const userService = new UserService();
  const data = {
    ...req.body,
    password: await hash(req.body.password, 10),
    provider: ProviderType.LOCAL,
    avatar: process.env.DEFAULT_URL_AVATAR,
  };
  delete data.repassword;

  const user = await userService.save(data);
  delete user.password;

  if (user)
    return res.json(new HttpException('Đăng ký thành công', 203)).status(203);
  return res.json(new BadRequestException());
};

export const logout = (req: Request, res: Response) => {
  if (req.isAuthenticated() && req.body.logout) {
    req.logOut();
    res.redirect('/');
  }
};
