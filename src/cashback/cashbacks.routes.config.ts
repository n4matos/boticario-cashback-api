import { CommonRoutesConfig } from '../common/common.routes.config';
import CashbackController from '../cashback/controllers/cashback.controller';
import express from 'express';


export class CashbackRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CashbackRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/cashback`)
      .get(CashbackController.getCashbackExternalApi)

    return this.app;
  }
}