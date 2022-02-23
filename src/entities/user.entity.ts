import { compare } from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export enum ProviderType {
  GOOGLE = 'google',
  GIT = 'git',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  LOCAL = 'local',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  fullName: string;

  @Column({ type: 'varchar', length: 255, default: null })
  avatar: string;

  @Column({ type: 'varchar', length: 255, default: null })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'enum', enum: ProviderType })
  provider: ProviderType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
