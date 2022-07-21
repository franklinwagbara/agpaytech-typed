import { Model } from "mongoose";
import { ICurrency, IQuery } from "../../interfaces";
import { IService, IResult } from "../../interfaces";
import { CurrencyModel } from "../../models";
import { getCurrencies, saveCurrencies } from "../../helpers";

export class CurrencyService implements IService<ICurrency> {
  private readonly _Model: Model<ICurrency>;

  constructor(Model: Model<ICurrency>) {
    this._Model = Model;
  }

  getAll = async (
    page: number,
    size: number,
    query: IQuery
  ): Promise<IResult<ICurrency>> => {
    return getCurrencies(this._Model, page, size, query);
  };

  saveMany = (data: ICurrency[]): Promise<IResult<ICurrency>> => {
    return saveCurrencies(data, this._Model);
  };

  // delete(id: number): Promise<IResult<ICurrency>> {
  //   throw new Error("Method not implemented.");
  // }
}

export default new CurrencyService(CurrencyModel);
