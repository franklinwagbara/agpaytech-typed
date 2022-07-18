import { ICurrency, IResult } from "../../interfaces";
import { Model } from "mongoose";
import { parseError } from "..";

const result: IResult<ICurrency> = {
  data: null,
  error: null,
};

export const saveCurrencies = async function (
  countries: ICurrency[],
  model: Model<ICurrency>
): Promise<IResult<ICurrency>> {
  try {
    await model.insertMany(countries);
    result.data = {success: "ok"};
    return Promise<IResult<ICurrency>>.resolve(result);
  } catch (error) {
    return parseError(error) as IResult<ICurrency>;
  }
};

export default saveCurrencies;
