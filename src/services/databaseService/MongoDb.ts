import mongoose from "mongoose";
import { IDatabase, IService, IResult } from "../../interfaces";

export default class MongoDb implements IDatabase<object> {
  private readonly DB_URI: string;

  constructor(DB_URI: string) {
    this.DB_URI = DB_URI;
  }

  connect(): Promise<object> {
    console.log("\nConnecting to database...");
    return mongoose.connect(this.DB_URI);
  }

  disconnect(): Promise<IResult<object>> {
    throw new Error("Method not implemented.");
  }
}
