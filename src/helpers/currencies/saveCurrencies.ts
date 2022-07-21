import { ICurrency, IResult } from "../../interfaces";
import { Model } from "mongoose";
import { parseError } from "../../utils";
import { validateCurrency } from "../../validation";

const result: IResult<ICurrency> = {
  data: null,
  error: null,
  status: 200
};

export const saveCurrencies = async function (
  currencies: ICurrency[],
  model: Model<ICurrency>
): Promise<IResult<ICurrency>> {
  try {
     for(let currency of currencies){
      const {error} = validateCurrency(currency);
      if(error) throw error;
    }

    await model.insertMany(currencies);
    result.data = {success: "ok"};
    return Promise<IResult<ICurrency>>.resolve(result);
  } catch (error) {
    return parseError(error, 500) as IResult<ICurrency>;
  }
};

export default saveCurrencies;
