import { Request, Response } from "express";
import express from "express";
import {
  IService,
  IResult,
  ICountry,
  IQuery,
  IController,
} from "../../interfaces";
import { countriesService } from "../../services";
import { base_dir } from "../../../base_dir";
import { parseCSV, parseError, saveFile } from "../../utils";
import fileUpload from "express-fileupload";
import _ from "lodash";
import { CountryModel } from "../../models";
import { Model } from "mongoose";
import * as _path from "path";

export class CountriesController implements IController<ICountry> {
  path: string;
  router: express.Router;
  model: Model<ICountry>;
  Service: IService<ICountry>;

  constructor(path: string, model: Model<ICountry>) {
    this.path = path;
    this.model = model;
    this.router = express.Router();
    this.Service = countriesService;

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
        "continent_code",
        "currency_code",
        "iso2_code",
        "iso3_code",
        "iso_numeric_code",
        "fips_code",
        "calling_code",
        "common_name",
        "official_name",
        "endonym",
        "demonym",
      ]),
    } as IQuery;
    const result: IResult<ICountry> = await this.Service.getAll(
      page,
      size,
      query
    );

    if (result.error) return res.status(500).send(result);
    return res.send(result);
  };

  getUploadPage = (req: Request, res: Response): Promise<Response> | void => {
    try {
      const uploadPath = _path.join(base_dir, "public", "index.html");
      console.log("upload path", uploadPath);
      return res.sendFile(uploadPath);
    } catch (error: unknown) {
      let result: IResult<ICountry> = {
        data: null,
        error: null,
      };
      result = parseError(error) as IResult<ICountry>;
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
      const csvObj: ICountry[] = (await parseCSV(
        base_dir + `/upload/${file.name}`
      )) as ICountry[];

      //save to database
      const result = await this.Service.saveMany(csvObj);

      if (result.error) return res.status(500).send(result);
      return res.status(200).send(result);
    } catch (error) {
      let result: IResult<ICountry> = {
        data: null,
        error: null,
      };
      result = parseError(error) as IResult<ICountry>;
      return res.status(500).send(result);
    }
  };
}

export default new CountriesController("/countries", CountryModel);
