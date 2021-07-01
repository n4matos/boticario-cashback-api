import express from 'express';
import cashbackService from '../services/cashback.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:cashbacks-controller');

class CashbacksController {
  async getCashbackExternalApi(req: express.Request, res: express.Response) {
    const cashback = await cashbackService.getCashbackExternalApi();
    res.status(200).send(cashback);
  }
}

export default new CashbacksController();