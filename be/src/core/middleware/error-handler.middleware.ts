import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../error.response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }
  res.status(400).json({
    errors: [{ message: err.message }],
  });
};
