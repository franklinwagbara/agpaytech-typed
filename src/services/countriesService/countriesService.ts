import { Model } from "mongoose";
import { ICountry, IQuery } from "../../interfaces";
import { IService, IResult } from "../../interfaces";
import { CountryModel } from "../../models";
import { getCountries, saveCountries } from "../../helpers";

export class CountriesService implements IService<ICountry> {
  private readonly _Model: Model<ICountry>;

  constructor(Model: Model<ICountry>){
    this._Model = Model;
  }

  getSingle(id: number): Promise<IResult<ICountry>> {
    const result: IResult<ICountry> = {
      data: null,
      error: null,
    };

    return Promise<IResult<ICountry>>.resolve(result);
  }
  async getAll(page: number, size: number, query: IQuery): Promise<IResult<ICountry>> {
    return getCountries(this._Model, page, size, query);
  }
  search(data: ICountry): Promise<IResult<ICountry>> {
    throw new Error("Method not implemented.");
  }

  saveOne(data: ICountry): Promise<IResult<ICountry>>{
    const result: IResult<ICountry> = {
      data: null,
      error: null,
    };
    return Promise<IResult<ICountry>>.resolve(result);
  }

  saveMany(data: ICountry[]): Promise<IResult<ICountry>>{
    return saveCountries(data, this._Model);
  }

  update(data: ICountry): Promise<IResult<ICountry>> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<IResult<ICountry>> {
    throw new Error("Method not implemented.");
  }
}

export default new CountriesService(CountryModel);
