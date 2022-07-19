import { IResult } from "./IResult";
import { IService } from "./IService";

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
