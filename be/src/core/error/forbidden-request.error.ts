import { ReasonStatusCode, StatusCode } from '../const';
import { ErrorResponse } from '../error.response';

export class ForBiddenRequestError extends ErrorResponse {
  statusCode: number = StatusCode.FORBIDDEN;
  constructor(message: string = ReasonStatusCode.FORBIDDEN) {
    super(message);
    Object.setPrototypeOf(this, ForBiddenRequestError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
