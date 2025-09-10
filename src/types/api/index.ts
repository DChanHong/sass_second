export type ApiResult<T = any> = {
  result: boolean;
  data: T;
  error?: string;
};


