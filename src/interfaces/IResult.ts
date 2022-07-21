export interface IResult<T> {
  data: T | T[] | object | null;
  error: string | null;
  status: number;
}
