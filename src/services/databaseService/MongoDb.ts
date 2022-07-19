import mongoose from "mongoose";
import { IDatabase, IService, IResult } from "../../interfaces";

export default class MongoDb implements IDatabase {
  private readonly DB_URI: string;

  constructor() {
    this.DB_URI = process.env.DB_URI as string;
  }

  async connect(): Promise<void> {
    console.log("\nConnecting to database...");
    try {
      mongoose.connect(this.DB_URI);
      return console.log("Connected to the database successfully.\n");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async disconnect(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
