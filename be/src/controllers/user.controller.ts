import { ReasonStatusCode, StatusCode } from '../core/const';
import { SuccessResponse } from '../core/success.response';
import { Request, Response } from 'express';
import { UserServices } from '../services/user.service';

export class UserController {
  static async getListUser(req: Request, res: Response) {
    new SuccessResponse(
      'Get users success',
      StatusCode.OK,
      ReasonStatusCode.OK,
      await UserServices.getListUser()
    ).send(res);
  }
}
