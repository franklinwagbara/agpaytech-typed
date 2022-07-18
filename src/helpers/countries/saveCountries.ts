import { ICountry, IResult } from "../../interfaces";
import { Model } from "mongoose";
import { parseError } from "../../helpers";

const result: IResult<ICountry> = {
  data: null,
  error: null,
};

export const saveCountries = async function (
  countries: ICountry[],
  model: Model<ICountry>
): Promise<IResult<ICountry>> {
  try {
    console.log("insert Many");
    await model.insertMany(countries);
    result.data = {success: "ok"};
    return Promise<IResult<ICountry>>.resolve(result);
  } catch (error) {
    return parseError(error);
  }
};

export default saveCountries;
