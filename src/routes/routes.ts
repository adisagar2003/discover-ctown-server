import { Router } from 'express';
import userController from "../controllers/user.controller";
import authController from "../controllers/auth.controller";
import locationController from "../controllers/location.controller";

const api = Router().use(userController).use(authController).use(locationController);

export default Router().use('/api', api);