import { ICurrency, IQuery, IResult } from "../../interfaces";
import { Model } from "mongoose";
import {parseError} from "..";
import { IPagination } from "../../interfaces/IPagination";
import _ from "lodash";

const result: IResult<ICurrency> = {
      data: null,
      error: null,
};

const getCurrencies = async (model: Model<ICurrency>, page: number, size: number, query: IQuery): Promise<IResult<ICurrency>> =>{
      let currencies = null;
      page = page || 1;
      size = size || 10;

      const startIndex = (page - 1) * size;
      const endIndex = page * size;
      const next: IPagination = {
            page: null,
            limit: null
      };
      const previous: IPagination = {
            page: null,
            limit: null
      };

      try {
            if(page <= 0 || size <= 0)
                  throw new Error("Wrong query parameter(s) value(s)");
                  
            for(let key in query){
                  query[key as keyof IQuery] = new RegExp(query[key as keyof IQuery] as string, "i");
            }
            
            currencies = await model.find(query).exec();

            if(endIndex < currencies.length){
                  next.page = page + 1;
                  next.limit = size;
            }

            if(startIndex > 0){
                  previous.page = page - 1;
                  previous.limit = size;
            }
            
            currencies = _.slice(currencies, startIndex, endIndex);
            result.data = {next: next, previous: previous, result: currencies};
            
            return Promise<IResult<ICurrency>>.resolve(result);
      } catch (error) {
            return parseError(error) as IResult<ICurrency>;
      }  
};
export default getCurrencies;
