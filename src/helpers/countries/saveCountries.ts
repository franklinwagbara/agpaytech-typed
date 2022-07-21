import { ICountry, IResult } from "../../interfaces";
import { Model } from "mongoose";
import { parseError } from "../../utils";
import { validateCountry } from "../../validation";

const result: IResult<ICountry> = {
  data: null,
  error: null,
  status: 200
};

export const saveCountries = async function (
  countries: ICountry[],
  model: Model<ICountry>
): Promise<IResult<ICountry>> {
  try {
    for(let country of countries){
      const {error} = validateCountry(country);
      if(error) throw error;
    }

    await model.insertMany(countries);
    result.data = {success: "ok"};
    return Promise<IResult<ICountry>>.resolve(result);
  } catch (error) {
    return parseError(error, 500) as IResult<ICountry>;
  }
};

export default saveCountries;
