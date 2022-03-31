import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import trendingHashtagsRouter from "./trendingHashtagsRouter.js";
import commentsRouter from "./commentsRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(postRouter);
router.use(trendingHashtagsRouter);
router.use(commentsRouter);

export default router;
