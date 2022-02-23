import { ProviderType } from '../entities/user.entity';
import { PassportStatic } from 'passport';
import { UserService } from '../services/user.service';
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
  StrategyOptions,
} from 'passport-google-oauth20';

export default function PassportGoogle(passport: PassportStatic): void {
  const userService: UserService = new UserService();

  const strategyOptions: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  };

  const verify = async function (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      let user = await userService.findByGoogle(profile._json.email);
      if (!user) {
        user = await userService.save({
          fullName: profile.displayName,
          avatar: profile._json.picture,
          email: profile._json.email,
          provider: ProviderType.GOOGLE,
        });
      }
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(null, false);
    }
  };

  passport.use(new GoogleStrategy(strategyOptions, verify));
}
