import { CommonRoutesConfig } from '../common/common.routes.config';
import PurchasesController from '../purchases/controllers/purchases.controller';
import purchasesMiddleware from './middleware/purchases.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../../src/auth/middleware/jwt.middleware';

export class PurchasesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'PurchasesRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/purchases`)
      .get(PurchasesController.listPurchases)

    this.app.post(`/purchases`, [
      body('code').isNumeric(),
      body('value').isNumeric(),
      body('date').isDate(),
      body('cpf')
        .isString()
        .isLength({ min: 14, max: 14 })
        .withMessage('Must include cpf (14 characters)'),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      PurchasesController.createPurchase,
    ]);

    this.app.param(`purchaseId`, purchasesMiddleware.extractPurchaseId);

    this.app
      .route(`/purchases/:purchaseId`)
      .get(PurchasesController.getPurchaseById)

    this.app.delete(`/purchases/:purchaseId`, [
      jwtMiddleware.validJWTNeeded,
      purchasesMiddleware.validatePurchaseStatus,
      PurchasesController.removePurchase
    ]);

    this.app.put(`/purchases/:purchaseId`, [
      body('code').isNumeric(),
      body('value').isNumeric(),
      body('date').isDate(),
      body('cpf')
        .isString()
        .isLength({ min: 14, max: 14 })
        .withMessage('Must include cpf (14 characters)'),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      purchasesMiddleware.validatePurchaseStatus,
      PurchasesController.put,
    ]);

    this.app.patch(`/purchases/:purchaseId`, [
      body('code').isNumeric().optional(),
      body('value').isNumeric().optional(),
      body('date').isDate().optional(),
      body('cpf')
        .isString()
        .isLength({ min: 14, max: 14 })
        .withMessage('Must include cpf (14 characters)')
        .optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      purchasesMiddleware.validatePurchaseStatus,
      PurchasesController.patch,
    ])

    this.app
      .route(`/cashback`)
      .get(PurchasesController.getCashbackExternalApi)

    return this.app;
  }
}