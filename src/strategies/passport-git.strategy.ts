import { VerifyFunction } from 'passport-facebook';
import { PassportStatic } from 'passport';
import {
  Strategy as GitHubStrategy,
  StrategyOptions,
  _StrategyOptionsBase,
} from 'passport-github2';
import { UserService } from '../services/user.service';
import axios from 'axios';
import { ProviderType } from '../entities/user.entity';

export default function PassportGithub(passport: PassportStatic): void {
  const userService: UserService = new UserService();

  const strategyOptions: StrategyOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  };

  const verify: VerifyFunction = async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, profile?: any) => void,
  ) => {
    try {
      const { data } = await axios.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      if (data.length > 0) {
        let user = await userService.findByGit(data[0].email);
        if (!user) {
          user = await userService.save({
            fullName: profile.displayName,
            email: data[0].email,
            avatar: profile._json.avatar_url,
            provider: ProviderType.GIT,
          });
        }
        return done(null, user);
      } else throw new Error('Can not fetch email');
    } catch (error) {
      console.error(error);
      return done(null, false);
    }
  };

  passport.use(new GitHubStrategy(strategyOptions, verify));
}
