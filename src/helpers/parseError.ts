import { ICountry, ICurrency, IResult } from "../interfaces";

const result: IResult<ICountry | ICurrency> = {
  data: null,
  error: null,
};

const parseError = (error: unknown): IResult<ICountry | ICurrency> => {
  console.error(error);
  result.data = null;

  if (error instanceof Error) {
    result.error = error.message;
  } else result.error = JSON.stringify(error);
  return result;
};

export default parseError;
