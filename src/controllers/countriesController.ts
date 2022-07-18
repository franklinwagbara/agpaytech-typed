import { Request, Response } from "express";
import { IService, IResult, ICountry, IQuery } from "../interfaces";
import { countriesService } from "../services";
import { base_dir } from "../../base_dir";
import { parseCSV, parseError, saveFile } from "../helpers";
import fileUpload from "express-fileupload";
import _ from "lodash";

const Service: IService<ICountry> = countriesService;

export class CountriesController {
  async get_countries(req: Request, res: Response) {
    //todo: implement validation
    //todo: implement pagination
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
    const result: IResult<ICountry> = await Service.getAll(page, size, query);

    if (result.error) return res.status(500).send(result);
    res.send(result);
  }

  get_uploadPage(req: Request, res: Response) {
    try {
      return res.sendFile(base_dir + "/htmlpages/index.html");
    } catch (error: unknown) {
      let result: IResult<ICountry> = {
        data: null,
        error: null,
      };
      result = parseError(error);
      return res.status(500).send(result);
    }
  }

  async post_uploadCSV(req: Request, res: Response) {
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
      const result = await Service.saveCountries(csvObj);

      if (result.error) return res.status(500).send(result);
      return res.status(200).send(result);
    } catch (error) {
      let result: IResult<ICountry> = {
        data: null,
        error: null,
      };
      result = parseError(error);
      return res.status(500).send(result);
    }
  }
}

export default new CountriesController();
