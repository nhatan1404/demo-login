import { PassportStatic } from 'passport';
import { IStrategyOptionBase, Profile } from 'passport-twitter';
import { UserService } from '../services/user.service';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { ProviderType } from '../entities/user.entity';
import { VerifyCallback } from 'passport-google-oauth20';

export default function PassportTwitter(passport: PassportStatic): void {
  const userService: UserService = new UserService();

  const strategyOptions: IStrategyOptionBase = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    includeEmail: true,
  };

  const verify = async function (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      let user = await userService.findByTwitter(profile._json.email);
      if (!user) {
        user = await userService.save({
          fullName: profile.displayName,
          avatar: profile._json.profile_image_url_https,
          email: profile._json.email,
          provider: ProviderType.TWITTER,
        });
      }
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(null, false);
    }
  };

  passport.use(new TwitterStrategy(strategyOptions, verify));
}
