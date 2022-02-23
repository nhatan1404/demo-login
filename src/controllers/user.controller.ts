import { Request, Response } from 'express';

export const showProfile = (req: Request, res: Response) => {
  res.render('user/profile', {
    title: 'Thông tin tài khoản',
    user: req.user,
  });
};
