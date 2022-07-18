import { IQuery } from "./IQuery";
import { IResult } from "./IResult";

export interface IService<T> {
  getSingle(id: number): Promise<IResult<T>>;
  getAll(page: number, size: number, query: IQuery): Promise<IResult<T>>;
  search(data: T): Promise<IResult<T>>;
  saveOne(data: T): Promise<IResult<T>>;
  saveMany(data: T[]): Promise<IResult<T>>;
  update(data: T): Promise<IResult<T>>;
  delete(id: number): Promise<IResult<T>>;
}
