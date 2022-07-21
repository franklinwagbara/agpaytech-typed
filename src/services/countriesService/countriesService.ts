import { Model } from "mongoose";
import { ICountry, IQuery } from "../../interfaces";
import { IService, IResult } from "../../interfaces";
import { CountryModel } from "../../models";
import { deleteCountries, getCountries, saveCountries } from "../../helpers";

export class CountriesService implements IService<ICountry> {
  private readonly _Model: Model<ICountry>;

  constructor(Model: Model<ICountry>) {
    this._Model = Model;
  }

  async getAll(
    page: number,
    size: number,
    query: IQuery
  ): Promise<IResult<ICountry>> {
    return getCountries(this._Model, page, size, query);
  }

  saveMany(data: ICountry[]): Promise<IResult<ICountry>> {
    return saveCountries(data, this._Model);
  }

  delete(query: IQuery): Promise<IResult<ICountry>> {
    return deleteCountries(this._Model, query);
  }
}

export default new CountriesService(CountryModel);
