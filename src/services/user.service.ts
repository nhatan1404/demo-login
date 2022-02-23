import { getConnection, getRepository, Repository } from 'typeorm';
import { ProviderType, User } from '../entities/user.entity';

export class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async save(data: any): Promise<User> {
    return this.repository.save(data);
  }

  public async findByUserId(userId: number): Promise<User> {
    return await this.repository.findOne(userId);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({
      where: { email },
    });
  }

  public async findByGit(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email,
        provider: ProviderType.GIT,
      },
    });
  }

  public async findByGoogle(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email,
        provider: ProviderType.GOOGLE,
      },
    });
  }

  public async findByFacebook(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email,
        provider: ProviderType.FACEBOOK,
      },
    });
  }

  public async findByTwitter(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email,
        provider: ProviderType.TWITTER,
      },
    });
  }
}
