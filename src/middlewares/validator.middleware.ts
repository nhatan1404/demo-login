import { sanitize } from 'class-sanitizer';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, RequestHandler } from 'express';
import BadRequestException from '../exceptions/badrequest.exception';

export default function validatorMiddleware(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return (req, res, next: NextFunction) => {
    const dtoObj = plainToClass(type, req.body);

    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const errorsMsg = errors.map((err) => ({
            field: err.property,
            message:
              'isEmpty' in err.constraints
                ? err.constraints.isEmpty
                : Object.values(err.constraints),
          }));
          // req.flash('errors', errorsMsg);
          res.send(new BadRequestException(errorsMsg).getMessage()).status(400);
        } else {
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      },
    );
  };
}
