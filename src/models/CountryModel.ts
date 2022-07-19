import { Schema, model, Model } from "mongoose";
import { ICountry } from "../interfaces";

const CountrySchema = new Schema<ICountry>({
  continent_code: { type: String, required: true },
  currency_code: String,
  iso2_code: String,
  iso3_code: String,
  iso_numeric_code: String,
  fips_code: String,
  calling_code: String,
  common_name: String,
  official_name: String,
  endonym: String,
  demonym: String,
});

const CountryModel: Model<ICountry> = model<ICountry>("Country", CountrySchema);
export { CountryModel };
