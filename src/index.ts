import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import flash from 'connect-flash';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import PassportGithub from './strategies/passport-git.strategy';
import PassportGoogle from './strategies/passport-google.strategy';
import PassportFacebook from './strategies/passport-facebook.strategy';
import PassportTwitter from './strategies/passport-twitter.strategy';
import PassportLocal from './strategies/passport-local.strategy';
import { config } from 'dotenv';
import authRouter from './routers/auth.router';
import userRouter from './routers/user.router';
import homeRouter from './routers/home.router';

(async () => {
  config();
  const app: Application = express();
  await createConnection();

  app
    .use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
      }),
    )
    .use(passport.initialize())
    .use(passport.session())
    .use(bodyParser.json())
    .use(
      bodyParser.urlencoded({
        extended: true,
      }),
    )
    .use(express.json())
    .use(flash())
    .set('views', [path.join(__dirname, '/views')])
    .set('view engine', 'ejs');

  app.use('/', express.static(path.join(__dirname, 'public')));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  PassportGithub(passport);
  PassportGoogle(passport);
  PassportFacebook(passport);
  PassportTwitter(passport);
  PassportLocal(passport);

  app.use('/', homeRouter);
  app.use('/auth', authRouter);
  app.use('/user', userRouter);

  const url = process.env.APP_URL;
  const port = process.env.APP_PORT;

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${url}:${port}`);
  });
})();
