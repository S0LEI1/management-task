import { ReasonStatusCode, StatusCode } from '../const';
import { ErrorResponse } from '../error.response';

export class ConflicRequestError extends ErrorResponse {
  statusCode: number = StatusCode.CONFLICT;
  constructor(message: string = ReasonStatusCode.CONFLICT) {
    super(message);
    Object.setPrototypeOf(this, ConflicRequestError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
