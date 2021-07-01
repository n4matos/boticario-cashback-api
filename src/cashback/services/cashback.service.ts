import { CreatePurchaseDto } from '../../purchases/dto/create.purchase.dto';

export default function calculateCashback(resource: CreatePurchaseDto) {

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

