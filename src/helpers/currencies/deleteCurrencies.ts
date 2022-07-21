import { ICurrency, IQuery, IResult } from "../../interfaces";
import { Model } from "mongoose";
import { parseError } from "../../utils";
import _ from "lodash";

const result: IResult<ICurrency> = {
      data: null,
      error: null,
      status: 200,
};

const deleteCurrencies = async (model: Model<ICurrency>, query: IQuery): Promise<IResult<ICurrency>> =>{
      let currencies = null;
      console.log("not suppose to be called during test");
      try {

            for(let key in query)
                  query[key as keyof IQuery] = new RegExp(query[key as keyof IQuery] as string, "i");
            
            currencies = await model.find(query);

            if(!currencies) return parseError("Does not exist", 404) as IResult<ICurrency>;
            
            await model.deleteMany(query);
            result.data = {success: "ok"};
            
            return Promise<IResult<ICurrency>>.resolve(result);
      } catch (error) {
            return parseError(error, 500) as IResult<ICurrency>;
      }  
};

export default deleteCurrencies;
