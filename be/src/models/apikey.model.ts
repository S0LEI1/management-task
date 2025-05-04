import { Document, Model, Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'Apikey';
const COLLECTION_NAME = 'Apikeys';
export enum PermissionEnum {
  Customer = '0000',
  Employee = '1111',
  Admin = '2222',
  Creator = '3333',
}
interface ApiKeyAttrs {
  key: string;
  status: boolean;
  permissions: PermissionEnum[];
}
export interface ApiKeyDoc extends Document {
  key: string;
  status: boolean;
  permissions: PermissionEnum[];
}
interface ApiKeyModel extends Model<ApiKeyDoc> {
  build(attrs: ApiKeyAttrs): ApiKeyDoc;
}

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: PermissionEnum,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

apiKeySchema.statics.build = (attrs: ApiKeyAttrs): ApiKeyDoc => {
  return new ApiKey(attrs);
};

const ApiKey = model<ApiKeyDoc, ApiKeyModel>(DOCUMENT_NAME, apiKeySchema);
export { ApiKey };
