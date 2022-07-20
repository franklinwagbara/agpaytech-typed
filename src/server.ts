import "dotenv/config";
import MongoDb from "./services/databaseService/MongoDb";
import { validateEnv } from "./utils";
import { App } from "./App";
import { countriesController, currenciesController } from "./controllers";

//Validate envs ////////////////
validateEnv();

export const app = new App(
  [countriesController, currenciesController],
  new MongoDb()
);
