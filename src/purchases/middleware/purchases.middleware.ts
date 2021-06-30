import express from 'express';
import userService from '../../users/services/users.service';
import purchaseService from '../services/purchases.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:purchases-controller');

class PurchasesMiddleware {

  async validateResellerExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const reseller = await userService.getUserByCpf(req.body.cpf);
    if (reseller) {
      next();
    } else {
      res.status(404).send({
        error: `Reseller ${req.body.cpf} not registered`,
      });
    }
  }

  async validatePurchaseStatus(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const status = await purchaseService.getPurchaseStatus(req.body.id);
    if (status) {
      next();
    } else {
      res.status(200).send({
        message: `Purchase ${req.body.id} is already approved. You can't edit or remove it`,
      });
    }
  }

  async extractPurchaseId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.purchaseId;
    next();
  }

  async validatePurchaseExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const purchase = await purchaseService.readById(req.params.purchaseId);
    if (purchase) {
      next();
    } else {
      res.status(404).send({
        error: `Purchase ${req.params.purchaseId} not found`,
      });
    }
  }

}

export default new PurchasesMiddleware();