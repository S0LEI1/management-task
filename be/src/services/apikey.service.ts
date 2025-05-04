import { ApiKey, ApiKeyDoc, PermissionEnum } from '../models/apikey.model';
import crypto from 'crypto';
const findById = async (key: string): Promise<ApiKeyDoc | null> => {
  const objKey = await ApiKey.findOne({ key: key, status: true }).lean();
  return objKey;
};
const createApiKey = async () => {
  const newKey = ApiKey.build({
    key: crypto.randomBytes(64).toString('hex'),
    status: true,
    permissions: [PermissionEnum.Employee],
  });
  await newKey.save();
  console.log('key::', newKey.key);
};

export { findById };
