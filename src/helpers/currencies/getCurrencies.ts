import { ICurrency, IQuery, IResult } from "../../interfaces";
import { Model } from "mongoose";
import { parseError } from "../../utils";
import { IPagination } from "../../interfaces/IPagination";
import _ from "lodash";

const result: IResult<ICurrency> = {
      data: null,
      error: null,
      status: 200
};

const getCurrencies = async (model: Model<ICurrency>, page: number, size: number, query: IQuery): Promise<IResult<ICurrency>> =>{
      let currencies = null;
      page = page || 1;
      size = size || 10;

      const startIndex = (page - 1) * size;
      const endIndex = page * size;
      const next: IPagination = {
            page: null,
            limit: null,
            count: null,
      };
      const previous: IPagination = {
            page: null,
            limit: null,
            count: null,
      };

      try {
            if(page <= 0 || size <= 0)
                  throw new Error("Wrong query parameter(s) value(s)");
                  
            for(let key in query){
                  query[key as keyof IQuery] = new RegExp(query[key as keyof IQuery] as string, "i");
            }
            
            currencies = await model.find(query);

            if(endIndex < currencies.length){
                  next.page = page + 1;
                  next.limit = size;
                  next.count = currencies.length;
            }

            if(startIndex > 0){
                  previous.page = page - 1;
                  previous.limit = size;
                  previous.count = currencies.length;
            }
            
            currencies = _.slice(currencies, startIndex, endIndex);
            result.data = {next: next, previous: previous, result: currencies};
            
            return Promise<IResult<ICurrency>>.resolve(result);
      } catch (error) {
            return parseError(error, 500) as IResult<ICurrency>;
      }  
};
export default getCurrencies;
