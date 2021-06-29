export interface PutPurchaseDto {
  code: number;
  value: number;
  date: Date;
  cpf: string;
  status: string;
  cashback_percent: number;
  cashback_value: number;
}