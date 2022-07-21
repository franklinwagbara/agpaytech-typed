import { IQuery } from "./IQuery";
import { IResult } from "./IResult";

export interface IService<T> {
  getAll(page: number, size: number, query: IQuery): Promise<IResult<T>>;
  saveMany(data: T[]): Promise<IResult<T>>;
  // update(data: T): Promise<IResult<T>>;
  //delete(query: T): Promise<IResult<T>>;
}
