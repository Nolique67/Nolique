import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import consultationsRouter from "./consultations";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/users", usersRouter);
router.use("/consultations", consultationsRouter);

export default router;
