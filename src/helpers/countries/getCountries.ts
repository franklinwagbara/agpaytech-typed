import { ICountry, IQuery, IResult } from "../../interfaces";
import { Model } from "mongoose";
import {parseError} from "../../helpers";
import { IPagination } from "../../interfaces/IPagination";
import _ from "lodash";

const result: IResult<ICountry> = {
      data: null,
      error: null,
};

const getCountries = async (model: Model<ICountry>, page: number, size: number, query: IQuery): Promise<IResult<ICountry>> =>{
      try {
            if(page <= 0 || size <= 0)
                  throw new Error("Wrong query parameter(s) value(s)");
                  
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

            for(let key in query){
                  query[key as keyof IQuery] = new RegExp(query[key as keyof IQuery] as string, "i");
            }

            //const countries = await model.find(query).limit(size).skip(startIndex).exec();
            let countries = await model.find(query).exec();
            
            if(endIndex < countries.length){
                  next.page = page + 1;
                  next.limit = size;
            }

            if(startIndex > 0){
                  previous.page = page - 1;
                  previous.limit = size;
            }
            
            countries = _.slice(countries, startIndex, endIndex);
            result.data = {next: next, previous: previous, result: countries};
            
            return Promise<IResult<ICountry>>.resolve(result);
      } catch (error) {
            return parseError(error);
      }  
};

export default getCountries;
