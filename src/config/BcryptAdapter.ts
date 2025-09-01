import { compareSync, hashSync } from "bcryptjs";

export class BcryptAdapter {
  static generateHash(password: string): string {
    return hashSync(password);
  }

  static compareHash(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }
}
