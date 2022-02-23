import { HttpMessage, HttpResponse } from './http-exception.interface';

class HttpException {
  private statusCode: number;
  private message: HttpMessage;

  constructor(message: HttpMessage, status: number) {
    this.message = message;
    this.statusCode = status;
  }

  public getMessage(): HttpResponse {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

export default HttpException;
