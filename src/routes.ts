import { Router } from "express";
import { AuthRoutes } from "./auth/presentation/routes";
import { TreatmentRoutes } from "./treatment/presentation/routes";
import { RolRoutes } from "./rol/presentation/routes";
import { UserRolesRoute } from "./user_rol/presentation/route";
import { MachineRoutes } from "./machine/presentation/route";
import { SessionRoutes } from "./session/presentation/routes";
import { UserTreatmentRoutes } from "./user_treatment/presentation/route";
import { UserMachineRoutes } from "./user_machine/presentation/route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/rol", RolRoutes.routes);
    router.use("/api/rol/assign", UserRolesRoute.routes);

    router.use("/api/treatment", TreatmentRoutes.routes);
    router.use("/api/machine", MachineRoutes.routes);

    router.use("/api/session", SessionRoutes.routes);

    router.use("/api/assignTreatment", UserTreatmentRoutes.routes);
    router.use("/api/assignMachine", UserMachineRoutes.routes);

    return router;
  }
}
