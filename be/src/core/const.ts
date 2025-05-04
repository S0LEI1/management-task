import { ApiKeyDoc } from '../models/apikey.model';
import { KeyTokenDoc } from '../models/keyToken.model';
import { UserDoc } from '../models/user.model';

const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  OK: 200,
  CREATED: 201,
};
const ReasonStatusCode = {
  FORBIDDEN: 'Forbidden error',
  BAD_REQUEST: 'Bad Request Error',
  CONFLICT: 'Confict error',
  OK: 'Ok',
  CREATED: 'Created',
};
const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'rtoken-id',
};
declare global {
  namespace Express {
    interface Request {
      objKey?: ApiKeyDoc;
      keyStore: KeyTokenDoc;
      user: Payload;
      refreshToken: string;
    }
  }
}
interface Payload {
  userId: any;
  phone: string;
  roles: string[];
}
enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  WRITER = 'WRITER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}
export { StatusCode, ReasonStatusCode, HEADER, Payload, UserRole };
