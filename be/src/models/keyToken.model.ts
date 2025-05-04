import { Schema, Document, Model, model } from 'mongoose';
import { User, UserDoc } from './user.model';
const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';
interface KeyTokenAttr {
  user: UserDoc;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokensUsed?: string[];
}
export interface KeyTokenDoc extends Document {
  user: UserDoc;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokensUsed: string[];
}
interface KeyTokenModel extends Model<KeyTokenDoc> {
  build(attrs: KeyTokenAttr): KeyTokenDoc;
}
// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
keyTokenSchema.statics.build = (attrs: KeyTokenAttr): KeyTokenDoc => {
  return new KeyToken(attrs);
};
const KeyToken = model<KeyTokenDoc, KeyTokenModel>(
  DOCUMENT_NAME,
  keyTokenSchema
);
export { KeyToken };
