import { Router } from "express";
import { postUser, searchUser, getAllUsers, getUserId } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();
userRouter.post('/users', validateSchemaMiddleware(userSchema, 422), postUser);
userRouter.get('/searchusers', searchUser);
userRouter.get('/allusers', getAllUsers);
userRouter.get('/getuser/:id', getUserId);

export default userRouter;