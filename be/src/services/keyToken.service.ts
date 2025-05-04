import { KeyToken } from '../models/keyToken.model';
import { UserDoc } from '../models/user.model';
interface TokenParam {
  user: UserDoc;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
}
export class KeyTokenService {
  static async createToken(params: TokenParam): Promise<string | null> {
    try {
      const filter = { user: params.user };
      const update = {
        publicKey: params.publicKey,
        privateKey: params.privateKey,
        refreshTokenUsed: [],
        refreshToken: params.refreshToken,
      };
      const options = { new: true, upsert: true };
      const tokens = await KeyToken.findOneAndUpdate(filter, update, options);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log((error as Error).message);

      return (error as Error).message;
    }
  }
  static async findByUserId(userId: string) {
    return await KeyToken.findOne({ user: userId });
  }
  static async removeKeyById(id: string) {
    return await KeyToken.deleteOne({ _id: id });
  }
  static async findByRefreshTokensUsed(refreshToken: string) {
    return await KeyToken.findOne({ refreshTokensUsed: refreshToken }).lean();
  }
  static async deleteByUserId(userId: string) {
    return await KeyToken.findOneAndDelete({ user: userId });
  }
  static async findByRefreshToken(refreshToken: string) {
    return await KeyToken.findOne({ refreshToken: refreshToken });
  }
}
