import { HttpMessage } from './http-exception.interface';
import HttpException from './http.exception';

class UnauthorizedException extends HttpException {
  constructor(message: HttpMessage= 'Unauthorized', statusCode: number = 401) {
    super(message, statusCode);
  }
}

export default UnauthorizedException;
