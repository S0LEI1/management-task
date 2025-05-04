import { ReasonStatusCode, StatusCode } from './const';
import { Response } from 'express';
export class SuccessResponse {
  statusCode = StatusCode.OK;
  reasonStatusCode = ReasonStatusCode.OK;
  message: string = '';
  metadata = {};
  constructor(
    message: string,
    statusCode: number = StatusCode.OK,
    reasonStatusCode: string = ReasonStatusCode.OK,
    metadata = {}
  ) {
    this.message = message ? message : reasonStatusCode;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
  send(res: Response, header = {}) {
    return res.status(this.statusCode).json(this);
  }
}
export class Ok extends SuccessResponse {
  constructor(message: string, metadata = {}) {
    super(message, StatusCode.OK, ReasonStatusCode.OK, metadata);
  }
}
export class CREATED extends SuccessResponse {
  constructor(message: string, metadata = {}) {
    super(message, StatusCode.CREATED, ReasonStatusCode.CREATED, metadata);
  }
}
