import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "superencryptedsecret";
const ROOT_RESELLER_CPF = process.env.ROOT_RESELLER_CPF;
const API_ACCUMULATE_CASHBACK = process.env.API_ACCUMULATE_CASHBACK;


const config = {
  jwtSecret: JWT_SECRET,
  rootResellerCpf: ROOT_RESELLER_CPF,
  apiAccumulateCashback: API_ACCUMULATE_CASHBACK
}

export default config;