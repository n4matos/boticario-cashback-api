import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "superencryptedsecret";
const ROOT_RESELLER = process.env.ROOT_RESELLER;
const API_ACCUMULATE_CASHBACK = process.env.API_ACCUMULATE_CASHBACK;


const config = {
  jwtSecret: JWT_SECRET,
  rootReseller: ROOT_RESELLER,
  apiAccumulateCashback: API_ACCUMULATE_CASHBACK
}

export default config;