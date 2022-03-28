import { Router } from "express";
import { postUser, searchUser } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();
userRouter.post('/users', validateSchemaMiddleware(userSchema, 422), postUser);
userRouter.get('/searchusers', searchUser);

export default userRouter;