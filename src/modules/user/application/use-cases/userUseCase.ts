import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { CreateUserDto } from "../../presentation/dto/CreateUserDto";
import { UserEntity } from "../../domain/entities/User.entity";
import { UpdateUserDto } from "../../presentation/dto/UpdateUserDto";
import bcrypt from "bcryptjs";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const user = UserEntity.create({
      id: crypto.randomUUID(),
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      wallet: data.wallet,
    });
    return this.userRepository.create(user);
  }
}

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    if (!id) {
      throw new Error("User ID is required.");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}

export class GetUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string) {
    if (!email) {
      throw new Error("Email is required.");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(page: number = 1, pageSize: number = 10) {
    if (page < 1 || pageSize < 1) {
      throw new Error("Invalid pagination parameters.");
    }

    return this.userRepository.findAll(page, pageSize);
  }
}

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UpdateUserDto): Promise<void> {
    await this.userRepository.update(data);
  }
}
