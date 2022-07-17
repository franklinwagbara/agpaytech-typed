import express, { Express } from "express";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import * as configuration from "dotenv";
import { countriesRouter } from "./routes";
import MongoDb from "./services/databaseService/MongoDb";
import { IDatabase } from "./interfaces";

// App Constants /////////////
configuration.config();
const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;
const DB_URI: string = process.env.DB_URI || "";
//////////////////////////////

// Middlewares ///////////////
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: true,
  })
);
app.use(fileUpload());
///////////////////////////////

// App routes endpoints ///////
app.use("/api/countries/", countriesRouter);
///////////////////////////////

// Setting up database and server  //
const database: IDatabase<object> = new MongoDb(DB_URI);
database
  .connect()
  .then(() => {
    console.log("Connected to database successfully.\n");
    console.log("Initializing server...");

    app.listen(PORT, () =>
      console.log(`Initialization complete. \nListening on port ${PORT}`)
    );
  })
  .catch((error) =>
    console.error(
      `FATAL ERROR: Unable to connect to database or server.\nEXCEPTION DUMP: ${error?.message}`
    )
  );
