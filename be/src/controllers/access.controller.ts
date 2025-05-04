import { NextFunction, Request, Response } from 'express';
import { CREATED, SuccessResponse } from '../core/success.response';
import { ReasonStatusCode, StatusCode } from '../core/const';
import { AccessService } from '../services/access.service';

export class AccessController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    const { name, phone, password, address } = req.body;
    console.log(`[P]::signUp::`, req.body);
    new CREATED(
      'Registered OK',
      await AccessService.signUp(name, phone, password, address)
    ).send(res);
  }
  static async login(req: Request, res: Response) {
    const { phone, password, refreshToken } = req.body;
    new SuccessResponse(
      'Login success',
      StatusCode.OK,
      ReasonStatusCode.OK,
      await AccessService.login({
        phone: phone,
        password: password,
        refreshToken: refreshToken,
      })
    ).send(res);
  }
  static async logout(req: Request, res: Response): Promise<any> {
    const { email, password, refreshToken } = req.body;
    new SuccessResponse(
      'Logout success',
      StatusCode.OK,
      ReasonStatusCode.OK,
      await AccessService.logout(req.keyStore)
    ).send(res);
  }
  static async handlerRefreshToken(req: Request, res: Response) {
    const { refreshToken, user, keyStore } = req;
    new SuccessResponse(
      'Logout success',
      StatusCode.OK,
      ReasonStatusCode.OK,
      await AccessService.handleRefreshToken(keyStore, user, refreshToken)
    ).send(res);
  }
}
