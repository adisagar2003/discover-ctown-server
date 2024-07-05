import { Router } from 'express';
import userController from "../controllers/user.controller";
import authController from "../controllers/auth.controller";

const api = Router().use(userController).use(authController);

export default Router().use('/api', api);