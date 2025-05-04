import { ValidationError } from 'express-validator';
import { ErrorResponse } from '../error.response';

export class RequestValidationError extends ErrorResponse {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Input invalid');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
