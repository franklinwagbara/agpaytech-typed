import express from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import path from "path";
import { IController, ICountry, ICurrency, IDatabase } from "../interfaces";

export class App {
  public app: express.Application;
  public database: IDatabase;
  public port: string | number;

  constructor(controllers: IController<any>[], database: IDatabase) {
    this.port = process.env.PORT || 3000;
    this.app = express();
    this.database = database;

    console.log("\nInitializing...");
    this.connectToDatabase(); //Establish database connection
    this.initializeMiddlewares(); //Initialize the middlewares
    this.initializeControllers(controllers); //Initialize the controllers
    this.listen(); //Start listening for requests
  }

  private initializeMiddlewares() {
    console.log("\nInitializing middlewares...");
    app.use(express.static(path.resolve(__dirname, "./build/")));
    this.app.use(express.json());
    this.app.use(
      helmet({
        contentSecurityPolicy: true,
      })
    );
    this.app.use(fileUpload());
    console.log("Middlewares initialization complete.\n");
  }

  private initializeControllers(controllers: IController<any>[]) {
    console.log("\nInitializing controllers...");
    controllers.forEach((controller) => {
      this.app.use("/api/", controller.router);
    });
    console.log("Controllers initialization complete.\n");
  }

  private connectToDatabase() {
    try {
      this.database.connect();
    } catch (error: any) {
      console.error(
        `FATAL ERROR: Unable to connect to database or server.\nEXCEPTION DUMP: ${error}`
      );
    }
  }

  public listen() {
    this.app.listen(this.port, () =>
      console.log(`Listening at port ${this.port}...`)
    );
  }
}
