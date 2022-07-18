import { Schema, model } from "mongoose";
import { ICurrency } from "../interfaces";

const CurrencySchema = new Schema<ICurrency>({
  iso_code: { type: String, required: true },
  iso_numeric_code: String,
  common_name: String,
  official_name: String,
  symbol: String,
});

const CurrencyModel = model<ICurrency>("Currency", CurrencySchema);
export { CurrencyModel };
