import { ICountry, IQuery, IResult } from "../../interfaces";
import { Model } from "mongoose";
import { parseError } from "../../utils";
import _ from "lodash";

const result: IResult<ICountry> = {
      data: null,
      error: null,
      status: 200,
};

const deleteCountries = async (model: Model<ICountry>, query: IQuery): Promise<IResult<ICountry>> =>{
      let countries = null;
      
      try {

            for(let key in query)
                  query[key as keyof IQuery] = new RegExp(query[key as keyof IQuery] as string, "i");
            
            countries = await model.find(query);

            if(!countries) return parseError("Does not exist", 404) as IResult<ICountry>;
            
            await model.deleteMany(query);
            result.data = {success: "ok"};
            
            return Promise<IResult<ICountry>>.resolve(result);
      } catch (error) {
            return parseError(error, 500) as IResult<ICountry>;
      }  
};

export default deleteCountries;
