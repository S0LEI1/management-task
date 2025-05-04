import { StatusCode } from '../const';
import { ErrorResponse } from '../error.response';

export class BadRequestError extends ErrorResponse {
  statusCode: number = StatusCode.BAD_REQUEST;
  constructor(message: string | any) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
