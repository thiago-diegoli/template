import { Router } from "express";
import AccountController from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";

const routes = Router();

const userController = new AccountController();

import { schema } from "./user.schema";

routes.post("/teste-yup", validateRequest(schema), (req, res) =>
  userController.create(req, res)
);

export default routes;