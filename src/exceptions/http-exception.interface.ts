export interface HttpResponse {
  statusCode: number;
  message: HttpMessage;
}

export interface ErrorValidation {
  field: string;
  message: string | string[];
}

export type HttpMessage =
  | string
  | string[]
  | ErrorValidation[]
  | Record<string, string>;
