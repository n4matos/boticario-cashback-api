import { CommonRoutesConfig } from '../common/common.routes.config';
import PurchasesController from '../purchases/controllers/purchases.controller';
import purchasesMiddleware from './middleware/purchases.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../../src/auth/middleware/jwt.middleware';
import purchasesController from '../purchases/controllers/purchases.controller';

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
      body('date').isISO8601(),
      body('cpf')
        .isString()
        .isLength({ min: 11, max: 11 })
        .withMessage('Must include cpf (11 characters)'),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      purchasesMiddleware.validateResellerExists,
      PurchasesController.createPurchase,
    ]);

    this.app.param(`purchaseId`, purchasesMiddleware.extractPurchaseId);



    this.app.get(`/purchases/:purchaseId`, [
      jwtMiddleware.validJWTNeeded,
      purchasesMiddleware.validatePurchaseExists,
      PurchasesController.getPurchaseById,
    ]);

    this.app.delete(`/purchases/:purchaseId`, [
      jwtMiddleware.validJWTNeeded,
      purchasesMiddleware.validatePurchaseExists,
      purchasesMiddleware.validatePurchaseStatus,
      purchasesController.removePurchase,
    ]);

    this.app.put(`/purchases/:purchaseId`, [
      body('code').isNumeric(),
      body('value').isNumeric(),
      body('date').isDate(),
      body('cpf')
        .isString()
        .isLength({ min: 11, max: 11 })
        .withMessage('Must include cpf (11 characters)'),
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
        .isLength({ min: 11, max: 11 })
        .withMessage('Must include cpf (11 characters)')
        .optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      purchasesMiddleware.validatePurchaseExists,
      purchasesMiddleware.validatePurchaseStatus,
      PurchasesController.patch,
    ])

    return this.app;
  }
}