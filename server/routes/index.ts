import authRouter from "./authRouter";
import userRouter from "./userRouter";
import categoryRouter from "./categoryRouter";
import blogRouter from "./blogRouter";
import comment from "./commentRouter";

const routes = [
  authRouter,
  userRouter,
  categoryRouter,
  blogRouter,
  comment,
];

export default routes;
