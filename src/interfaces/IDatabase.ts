import { IResult } from "./IResult";
import { IService } from "./IService";

export interface IDatabase<T> extends IService<T> {
  connect(): Promise<T>;
  disconnect(): Promise<T>;
}
