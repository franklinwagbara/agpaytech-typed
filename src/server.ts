import "dotenv/config";
import express, { Express } from "express";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import { countriesRouter, currenciesRouter } from "./routes";
import MongoDb from "./services/databaseService/MongoDb";
import { validateEnv } from "./utils";
import { App } from "./App";
import { countriesController, currenciesController } from "./controllers";

//Validate envs ////////////////
validateEnv();

const _app = new App(
  [countriesController, currenciesController],
  new MongoDb()
);
