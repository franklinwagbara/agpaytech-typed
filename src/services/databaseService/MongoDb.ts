import "dotenv/config";
import mongoose from "mongoose";
import { IDatabase, IService, IResult } from "../../interfaces";

export default class MongoDb implements IDatabase {
  public readonly DB_URI: string;

  constructor() {
    this.DB_URI = process.env.DB_URI || "";
  }

  async connect(): Promise<void> {
    console.log("\nConnecting to database...");
    try {
      await mongoose.connect(this.DB_URI);
      console.log("Connected to the database successfully.\n");
    } catch (error: any) {
      console.error(error);
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
