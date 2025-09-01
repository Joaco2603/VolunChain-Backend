import { IsStellarPublicKey } from "@/shared/infrastructure/validators/StellarPublicKey";
import { IsString } from "class-validator";

// Class-based DTOs with validation
export class WalletDto {
  @IsString({ message: "Wallet address must be a string" })
  @IsStellarPublicKey()
  walletAddress: string;
}
