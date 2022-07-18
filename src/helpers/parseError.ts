import { ICountry, IResult } from "../interfaces";

const result: IResult<ICountry> = {
  data: null,
  error: null,
};

const parseError = (error: unknown): IResult<ICountry> => {
  console.log(error);
  result.data = null;

  if (error instanceof Error) {
    result.error = error.message;
  } else result.error = JSON.stringify(error);
  return result;
};

export default parseError;
