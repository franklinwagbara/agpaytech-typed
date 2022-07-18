import { Request, Response } from "express";
import { IService, IResult, ICurrency, IQuery } from "../interfaces";
import { currenciesService } from "../services";
import { base_dir } from "../../base_dir";
import { parseCSV, parseError, saveFile } from "../helpers";
import fileUpload from "express-fileupload";
import _ from "lodash";

const Service: IService<ICurrency> = currenciesService;

export class CurrenciesController {
  async get_currencies(req: Request, res: Response) {
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
    const result: IResult<ICurrency> = await Service.getAll(page, size, query);

    if (result.error) return res.status(500).send(result);
    res.send(result);
  }

  get_uploadPage(req: Request, res: Response) {
    try {
      return res.sendFile(base_dir + "/htmlpages/index.html");
    } catch (error: unknown) {
      let result: IResult<ICurrency> = {
        data: null,
        error: null,
      };
      result = parseError(error) as IResult<ICurrency>;
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
      const csvObj: ICurrency[] = (await parseCSV(
        base_dir + `/upload/${file.name}`
      )) as ICurrency[];

      //save to database
      const result = await Service.saveMany(csvObj);

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
  }
}

export default new CurrenciesController();
