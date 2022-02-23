import { HttpMessage } from './http-exception.interface';
import HttpException from './http.exception';

class BadRequestException extends HttpException {
  constructor(message: HttpMessage = 'Bad Request', status: number = 400) {
    super(message, status);
  }
}

export default BadRequestException;
