import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../application/repository/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";

export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    wallet: string
  ): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        wallet,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return UserEntity.create({
      id: user.id,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      password: user.password,
      wallet: user.wallet,
      isVerified: user.isVerified,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return UserEntity.create({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      wallet: user.wallet,
      isVerified: user.isVerified,
    });
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return UserEntity.create({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      wallet: user.wallet,
      isVerified: user.isVerified,
    });
  }

  async saveVerificationToken(email: string, token: string): Promise<void> {
    await this.prisma.user.update({
      where: { email },
      data: {
        verificationToken: token,
        verificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60), // opcional, depende tu lógica
        updatedAt: new Date(),
      },
    });
  }

  async updateVerificationToken(
    userId: string,
    token: string,
    expires: Date
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        verificationToken: token,
        verificationTokenExpires: expires,
        updatedAt: new Date(),
      },
    });
  }

  async findByVerificationToken(token: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) return null;

    return UserEntity.create({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      wallet: user.wallet,
      isVerified: user.isVerified,
    });
  }

  async updateVerificationStatus(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpires: null,
        updatedAt: new Date(),
      },
    });
  }

  async isUserVerified(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { isVerified: true },
    });

    return user ? user.isVerified : false;
  }
}
