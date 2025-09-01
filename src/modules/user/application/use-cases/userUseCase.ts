import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UpdateUserDto } from "../../presentation/dto/UpdateUserDto";

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
