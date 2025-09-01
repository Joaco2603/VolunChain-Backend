import { UserEntity } from "../../domain/entities/User.entity";

export interface IUserRepository {
  createUser(
    name: string,
    email: string,
    password: string,
    wallet: string
  ): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(userId: string): Promise<UserEntity | null>;
  saveVerificationToken(
    email: string,
    token: string,
    tokenExpires: Date
  ): Promise<void>;
  updateVerificationToken(
    userId: string,
    token: string,
    expires: Date
  ): Promise<void>;
  findByVerificationToken(token: string): Promise<UserEntity | null>;
  updateVerificationStatus(userId: string): Promise<void>;
  isUserVerified(userId: string): Promise<boolean>;
}
