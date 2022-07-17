import { IResult } from "./IResult";

export interface IService<T> {
  getSingle(id: number): Promise<IResult<T>>;
  getAll(): Promise<IResult<T>[]>;
  search(data: T): Promise<IResult<T>[]>;
  save(datum: T): Promise<IResult<T>>;
  save(data: T[]): Promise<IResult<T>>;
  update(data: T): Promise<IResult<T>>;
  delete(id: number): Promise<IResult<T>>;
}
