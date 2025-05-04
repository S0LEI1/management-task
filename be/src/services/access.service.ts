import bcrypt from 'bcrypt';
import { generateKeyPairSync } from 'crypto';
import { KeyTokenService } from './keyToken.service';
import { createTokenPair, verifyJWT } from '../auth/authUtils';
import { getInfoData } from '../utils';
import { BadRequestError, NotAuthorizedError } from '@share-package/common';
import { UserServices } from './user.service';
import { ForBiddenRequestError } from '../core/error/forbidden-request.error';
import { Payload, UserRole } from '../core/const';
import { User } from '../models/user.model';
import { KeyTokenDoc } from '../models/keyToken.model';

export class AccessService {
  static login = async (params: {
    phone: string;
    password: string;
    refreshToken: string;
  }) => {
    const existUser = await UserServices.findByPhone(params.phone);
    if (!existUser) throw new BadRequestError('User not registered');
    const match = bcrypt.compare(params.password, existUser.password);
    if (!match) throw new NotAuthorizedError();
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });
    const payload = {
      userId: existUser._id.toString(),
      phone: existUser.phone,
      roles: existUser.roles,
    };
    console.log(payload);

    const tokens = await createTokenPair(payload, publicKey, privateKey);
    await KeyTokenService.createToken({
      user: existUser,
      publicKey: publicKey,
      privateKey: privateKey,
      refreshToken: tokens?.refreshToken!,
    });
    return {
      user: getInfoData({
        fields: ['_id', 'name', 'phone'],
        object: existUser,
      }),
      tokens,
    };
  };
  static async signUp(
    name: string,
    phone: string,
    password: string,
    address: string
  ) {
    // lean: return object JS original
    const existUser = await User.findOne({ phone: phone }).lean();
    if (existUser) {
      throw new BadRequestError('Error: Shop already registered');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = User.build({
      name: name,
      phone: phone,
      password: hashPassword,
      roles: [UserRole.EMPLOYEE],
      address: address,
    });
    await newUser.save();
    if (newUser) {
      return {
        code: 201,
        meatadata: {
          user: getInfoData({
            fields: ['_id', 'name', 'phone'],
            object: newUser,
          }),
        },
      };
    }
    return {
      code: 200,
      meatadata: null,
    };
  }
  static async logout(keyStore: KeyTokenDoc) {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id as string);
    return delKey;
  }
  static async handleRefreshToken(
    keyStore: KeyTokenDoc,
    user: Payload,
    refreshToken: string
  ) {
    const { userId, phone } = user;
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteByUserId(userId);
      throw new ForBiddenRequestError(
        'Sometime went wrong ! Please login again'
      );
    }
    if (keyStore.refreshToken !== refreshToken) {
      throw new NotAuthorizedError();
    }
    const foundShop = await UserServices.findByPhone(phone);
    if (!foundShop) throw new NotAuthorizedError();

    const newPayload: Payload = {
      phone: foundShop.phone,
      userId: foundShop._id,
      roles: foundShop.roles,
    };
    const tokens = await createTokenPair(
      newPayload,
      keyStore.publicKey,
      keyStore.privateKey
    );
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens?.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });
    return { user, tokens };
  }
}
