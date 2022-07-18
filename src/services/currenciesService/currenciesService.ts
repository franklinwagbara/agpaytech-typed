import { Model } from "mongoose";
import { ICurrency, IQuery } from "../../interfaces";
import { IService, IResult } from "../../interfaces";
import { CurrencyModel } from "../../models";
import { getCurrencies, saveCurrencies } from "../../helpers";

export class CurrencyService implements IService<ICurrency> {
  private readonly _Model: Model<ICurrency>;

  constructor(Model: Model<ICurrency>){
    this._Model = Model;
  }

  getSingle(id: number): Promise<IResult<ICurrency>> {
    const result: IResult<ICurrency> = {
      data: null,
      error: null,
    };

    return Promise<IResult<ICurrency>>.resolve(result);
  }
  async getAll(page: number, size: number, query: IQuery): Promise<IResult<ICurrency>> {
    return getCurrencies(this._Model, page, size, query);
  }
  search(data: ICurrency): Promise<IResult<ICurrency>> {
    throw new Error("Method not implemented.");
  }

  saveOne(data: ICurrency): Promise<IResult<ICurrency>>{
    const result: IResult<ICurrency> = {
      data: null,
      error: null,
    };
    return Promise<IResult<ICurrency>>.resolve(result);
  }

  saveMany(data: ICurrency[]): Promise<IResult<ICurrency>>{
    return saveCurrencies(data, this._Model);
  }

  update(data: ICurrency): Promise<IResult<ICurrency>> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<IResult<ICurrency>> {
    throw new Error("Method not implemented.");
  }
}

export default new CurrencyService(CurrencyModel);
