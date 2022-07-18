import { Request, Response, NextFunction } from "express";
import {
  ParamsDictionary,
  RequestHandlerParams,
  Query,
} from "express-serve-static-core";
import {
  ICountry,
  ICurrency,
  IService,
  IResult,
  IPagination,
} from "../interfaces";

declare module "express" {
  export interface Response {
    results?: object;
  }
}

const paginateResults = (
  Service: IService<ICountry | ICurrency>
): RequestHandlerParams<
  ParamsDictionary,
  any,
  any,
  Query,
  Record<string, any>
> => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const page: number | undefined = parseInt(req.query.page as string);
    const size: number | undefined = parseInt(req.query.size as string);

    if (page <= 0 || size <= 0)
      throw new Error("Wrong query parameter(s) value(s)");

    const startIndex = (page - 1) * size;
    const endIndex = page * size;
    const nextPage: IPagination = {
      page: 0,
      limit: 0,
    };
    const previousPage: IPagination = {
      page: 0,
      limit: 0,
    };

    // if (endIndex < (await model.countDocuments().exec())) {
    //   nextPage.page = page + 1;
    //   nextPage.limit = size;
    // }

    if (startIndex > 0) {
      previousPage.page = page - 1;
      previousPage.limit = size;
    }
    //const result: IResult<ICountry | ICurrency> = await Service.getAll();
    //res.results = result;
    next();
    return;
  };
};

export default paginateResults;
