export class ApiResponse<T = any> {
    statusCode: number | undefined;
    errors: string[] | undefined;
    data: T[] | undefined;
  }
  