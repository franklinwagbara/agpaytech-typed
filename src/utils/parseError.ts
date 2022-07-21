import { ICountry, ICurrency, IResult } from "../interfaces";

const parseError = (
  error: unknown,
  status: number
): IResult<ICountry | ICurrency> => {
  const result: IResult<ICountry | ICurrency> = {
    data: null,
    error: null,
    status: status,
  };

  console.error(error);
  result.data = null;

  if (error instanceof Error) {
    result.error = error.message;
  } else result.error = JSON.stringify(error);
  return result;
};

export default parseError;
