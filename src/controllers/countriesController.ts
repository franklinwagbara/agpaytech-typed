import { Request, Response } from "express";
import { IService, IResult } from "../interfaces";
import { countriesService } from "../services";
import { Country } from "../dto";

export class CountriesController {
  async get_countries(req: Request, res: Response) {
    const Service: IService<Country> = countriesService;
    const result: IResult<Country>[] = await Service.getAll();
    res.send(result);
  }
}

export default new CountriesController();
