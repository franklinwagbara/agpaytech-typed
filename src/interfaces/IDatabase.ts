import { IResult } from "./IResult";
import { IService } from "./IService";

export interface IDatabase<T> {
  connect(): Promise<T>;
  disconnect(): Promise<T>;
}
