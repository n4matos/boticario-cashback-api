import { CreatePurchaseDto } from '../../purchases/dto/create.purchase.dto';
import config from '../../config/config';
import fetch from 'node-fetch';


class CashbackService {

  async getCashbackExternalApi() {
    const baseUrl = config.apiExternalCashback;
    const queryString = '?cpf=12312312323';

    const response = await fetch(baseUrl + queryString, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'token': 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'
      }
    });

    var data = await response.json();

    return data.body;
  }

  async calculateCashback(resource: CreatePurchaseDto) {

    var cashbackPercent: number;
    var cashbackValue: number;

    if (resource.value < 1000) {
      cashbackPercent = 10;
      cashbackValue = resource.value * (cashbackPercent / 100);
    } else if (resource.value >= 1000 && resource.value < 1500) {
      cashbackPercent = 15;
      cashbackValue = resource.value * (cashbackPercent / 100);
    } else {
      cashbackPercent = 20;
      cashbackValue = resource.value * (cashbackPercent / 100);
    }

    resource.cashback_percent = cashbackPercent;
    resource.cashback_value = cashbackValue;
  }

}

export default new CashbackService;

