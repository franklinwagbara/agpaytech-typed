import { Country } from "../../dto";
import { IService, IResult } from "../../interfaces";

export class CountriesService implements IService<Country> {
  getSingle(id: number): Promise<IResult<Country>> {
    const result: IResult<Country> = {
      data: null,
      error: null,
    };

    return Promise<IResult<Country>>.resolve(result);
  }
  getAll(): Promise<IResult<Country>[]> {
    const result: IResult<Country>[] = [{
      data: new Country(1, "Nigeria"),
      error: null,
    }];

    return Promise<IResult<Country>[]>.resolve(result);
  }
  search(data: Country): Promise<IResult<Country>[]> {
    throw new Error("Method not implemented.");
  }
  save(datum: Country): Promise<IResult<Country>>;
  save(data: Country[]): Promise<IResult<Country>>;
  save(data: unknown): Promise<IResult<Country>> {
    throw new Error("Method not implemented.");
  }
  update(data: Country): Promise<IResult<Country>> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<IResult<Country>> {
    throw new Error("Method not implemented.");
  }
}

export default new CountriesService();
