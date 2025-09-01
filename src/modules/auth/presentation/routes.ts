import { Router } from "express";

import { AuthController } from "./controllers/Auth.controller";

import {
  EmailVerificationUseCase,
  ResendVerificationEmailUseCase,
  SendVerificationEmailUseCase,
} from "../application/use-cases/index";

import { UserRepositoryImpl } from "@/modules/user/infrastructure/repositories/user.repository.impl";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    //Repository
    const repository = new UserRepositoryImpl(prisma);

    const controller = new AuthController(
      new SendVerificationEmailUseCase(repository),
      new ResendVerificationEmailUseCase(repository),
      new EmailVerificationUseCase(repository)
    );

    router.post("/login", controller.login);
    router.post("/verifiedEmail", controller.register);
    router.post("/resendVerificationEmail", controller.resendVerificationEmail);

    router.post("/verifyEmail", controller.verifyEmail);

    return router;
  }
}
