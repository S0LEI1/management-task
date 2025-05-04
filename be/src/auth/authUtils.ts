import JWT from 'jsonwebtoken';
import { asyncHandler } from '../helpers/asyncHandler';
import { NextFunction, Response, Request } from 'express';
import { HEADER, Payload } from '../core/const';
import { NotAuthorizedError, NotFoundError } from '@share-package/common';
import { KeyTokenService } from '../services/keyToken.service';
import { UserDoc } from '../models/user.model';

const createTokenPair = async (
  payload: Payload,
  publicKey: string,
  privateKey: string
) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days',
    });
    const refreshToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7 days',
    });
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log('error verify::', err);
      }
      console.log('decode verify', decode);
    });
    return { accessToken, refreshToken };
  } catch (error) {}
};
const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new NotAuthorizedError();
    const keyStore = await KeyTokenService.findByUserId(userId as string);
    if (!keyStore) throw new NotFoundError('Key Store');
    const refreshToken = req.headers[HEADER.REFRESHTOKEN];
    if (refreshToken) {
      try {
        const decodeUser = JWT.verify(
          refreshToken as string,
          keyStore.privateKey
        );
        if (userId !== (decodeUser as Payload).userId)
          throw new NotAuthorizedError();
        req.keyStore = keyStore;
        req.user = decodeUser as Payload;
        req.refreshToken = refreshToken as string;
        return next();
      } catch (error) {
        throw error;
      }
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new NotAuthorizedError();
    try {
      const decodeUser = JWT.verify(accessToken as string, keyStore.publicKey);
      if (userId !== (decodeUser as Payload).userId)
        throw new NotAuthorizedError();
      req.keyStore = keyStore;
      req.user = decodeUser as Payload;
      return next();
    } catch (error) {
      throw error;
    }
  }
);
const verifyJWT = async (token: string, keySecret: string) => {
  const payload = JWT.verify(token, keySecret);
  return payload as Payload;
};
export { createTokenPair, authentication, verifyJWT };
