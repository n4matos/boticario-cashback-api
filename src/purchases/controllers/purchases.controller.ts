// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we import our newly created user services
import purchasesService from '../../purchases/services/purchases.service';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

const log: debug.IDebugger = debug('app:purchases-controller');

class PurchasesController {

  async listPurchases(req: express.Request, res: express.Response) {
    const users = await purchasesService.list(100, 0);
    res.status(200).send(users);
  }

  async getPurchaseById(req: express.Request, res: express.Response) {
    const user = await purchasesService.readById(req.body.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(200).json({
        message: 'Purchase has not found'
      })
    }
  }

  async getCashbackExternalApi(req: express.Request, res: express.Response) {
    const cashback = await purchasesService.getCashbackExternalApi();
    res.status(200).send(cashback);
  }

  async createPurchase(req: express.Request, res: express.Response) {
    const purchaseId = await purchasesService.create(req.body);
    res.status(201).send({ id: purchaseId });
  }

  async put(req: express.Request, res: express.Response) {
    log(await purchasesService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async patch(req: express.Request, res: express.Response) {
    log(await purchasesService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async removePurchase(req: express.Request, res: express.Response) {
    log(await purchasesService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new PurchasesController();