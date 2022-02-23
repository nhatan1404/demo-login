import { PassportStatic } from 'passport';
import { UserService } from '../services/user.service';
import {
  IStrategyOptions,
  IVerifyOptions,
  Strategy as LocalStrategy,
} from 'passport-local';

export default function PassportLocal(passport: PassportStatic): void {
  const userService = new UserService();

  const strategyOptions: IStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: true,
  };

  const verify = async function (
    email: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void,
  ) {
    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return done(null);
      }
      const isValidPassword = await user.validatePassword(password);

      if (!isValidPassword) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  };

  passport.use(new LocalStrategy(strategyOptions, verify));
}
