import { PassportStatic } from 'passport';
import { Profile, StrategyOption, VerifyFunction } from 'passport-facebook';
import { UserService } from '../services/user.service';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { ProviderType } from '../entities/user.entity';

export default function PassportFacebook(passport: PassportStatic): void {
  const userService = new UserService();

  const strategyOptions: StrategyOption = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email'],
  };

  const verify: VerifyFunction = async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err?: Error | null, profile?: any) => void,
  ) => {
    try {
      let user = await userService.findByFacebook(profile._json.email);
      if (!user) {
        user = await userService.save({
          fullName: profile.displayName,
          email: profile._json.email,
          avatar: profile._json.picture.data.url,
          provider: ProviderType.FACEBOOK,
        });
      }
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(null, false);
    }
  };

  passport.use(new FacebookStrategy(strategyOptions, verify));
}
