// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we import our newly created user services
import purchasesService from '../../purchases/services/purchases.service';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

const log: debug.IDebugger = debug('app:cashbacks-controller');

class CashbacksController {
  async getCashbackExternalApi(req: express.Request, res: express.Response) {
    const cashback = await purchasesService.getCashbackExternalApi();
    res.status(200).send(cashback);
  }
}

export default new CashbacksController();