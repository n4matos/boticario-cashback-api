import { CreatePurchaseDto } from '../dto/create.purchase.dto';
import { PatchPurchaseDto } from '../dto/patch.purchase.dto';
import { PutPurchaseDto } from '../dto/put.purchase.dto';

import mongooseService from '../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-dao');

class PurchasesDao {

  Schema = mongooseService.getMongoose().Schema;

  purchaseSchema = new this.Schema({
    _id: String,
    code: Number,
    value: Number,
    date: Date,
    cpf: String,
    status: String,
    cashback_percent: Number,
    cashback_value: Number,
  }, { id: false });

  Purchase = mongooseService.getMongoose().model('Purchases', this.purchaseSchema);

  constructor() {
    log('Created new instance of PurchasesDao');
  }

  async addPurchase(purchaseFields: CreatePurchaseDto) {
    const purchaseId = shortid.generate();
    const purchase = new this.Purchase({
      _id: purchaseId,
      ...purchaseFields,
    });

    await purchase.save();
    return purchaseId;
  }

  async getPurchases(limit = 25, page = 0) {
    return this.Purchase.find()
      .select('_id code value date cashback_percent cashback_value status')
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getPurchaseById(purchaseId: string) {
    return this.Purchase.findOne({ _id: purchaseId })
      .select('_id code value date cashback_percent cashback_value status')
      .populate('Purchase').exec();
  }

  async updatePurchaseById(
    purchaseId: string,
    purchaseFields: PatchPurchaseDto | PutPurchaseDto
  ) {
    const existingPurchase = await this.Purchase.findOneAndUpdate(
      { _id: purchaseId },
      { $set: purchaseFields },
      { new: true }
    ).exec();

    return existingPurchase;
  }

  async removePurchaseById(purchaseId: string) {
    return this.Purchase.deleteOne({ _id: purchaseId }).exec();
  }

  async getPurchaseStatus(purchaseId: string) {
    return this.Purchase.findOne({ _id: purchaseId })
      .select('status -_id')
      .exec();
  }
}

export default new PurchasesDao();