import { Application } from "express";
import { healthRoutes } from "@gateway/routes/health";

import { authRoutes } from "@gateway/routes/auth.routes";
const BASE_PATH = '/api/v1/gateway';
export const appRoutes = (app: Application): void => {
  app.use(`${BASE_PATH}/auth`, authRoutes.routes());
  app.use(BASE_PATH, healthRoutes.routes());
};
