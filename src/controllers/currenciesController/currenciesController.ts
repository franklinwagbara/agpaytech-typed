import { Request, Response } from "express";
import express from "express";
import {
  IService,
  IResult,
  ICurrency,
  IQuery,
  IController,
} from "../../interfaces";
//import { currenciesService } from "../../services";
import { base_dir } from "../../../base_dir";
import { parseCSV, parseError, saveFile } from "../../utils";
import fileUpload from "express-fileupload";
import _ from "lodash";
import { CurrencyModel } from "../../models";
import { Model } from "mongoose";
import { currenciesService } from "../../services";

export class CurrenciesController implements IController<ICurrency> {
  path: string;
  router: express.Router;
  model: Model<ICurrency>;
  Service: IService<ICurrency>;

  constructor(path: string, model: Model<ICurrency>) {
    this.path = path;
    this.model = model;
    this.router = express.Router();
    this.Service = currenciesService;

    this.initializeRoutes(); //Initialize routes
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/uploadpage`, this.getUploadPage);
    this.router.post(`${this.path}/uploadcsv`, this.postUploadCSV);
    //this.router.get(`${this.path}/:id`,);
  }

  getAll = async (req: Request, res: Response): Promise<Response> => {
    //todo: implement validation
    const page: number | undefined = parseInt(req.query.page as string);
    const size: number | undefined = parseInt(req.query.size as string);
    const query: IQuery = {
      ..._.pick(req.query, [
        "iso_code",
        "iso_numeric_code",
        "common_name",
        "official_name",
        "symbol",
      ]),
    } as IQuery;
    const result: IResult<ICurrency> = await this.Service.getAll(
      page,
      size,
      query
    );

    if (result.error) return res.status(500).send(result);
    return res.send(result);
  };

  getUploadPage = (req: Request, res: Response): Promise<Response> | void => {
    try {
      return res.sendFile(base_dir + "/src/htmlpages/index.html");
    } catch (error: unknown) {
      let result: IResult<ICurrency> = {
        data: null,
        error: null,
      };
      result = parseError(error) as IResult<ICurrency>;
      res.status(500).send(result);
      return;
    }
  };

  postUploadCSV = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (req.files === undefined) throw new Error("File was not attached.");
      const file: fileUpload.UploadedFile = req.files
        .file as fileUpload.UploadedFile;

      //save file to upload directory
      saveFile(file);

      //parse the csv file to an object
      const csvObj: ICurrency[] = (await parseCSV(
        base_dir + `/upload/${file.name}`
      )) as ICurrency[];

      //save to database
      const result = await this.Service.saveMany(csvObj);

      if (result.error) return res.status(500).send(result);
      return res.status(200).send(result);
    } catch (error) {
      let result: IResult<ICurrency> = {
        data: null,
        error: null,
      };
      result = parseError(error) as IResult<ICurrency>;
      return res.status(500).send(result);
    }
  };
}

export default new CurrenciesController("/currencies", CurrencyModel);
