export interface IResult<T> {
  data: T | null;
  error: string | null;
}
