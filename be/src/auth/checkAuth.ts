import { NextFunction, Request, Response } from 'express';
import { findById } from '../services/apikey.service';
import { ApiKeyDoc, PermissionEnum } from '../models/apikey.model';
import { HEADER, UserRole } from '../core/const';

const apiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).send({
        message: 'Forbidden Error',
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {}
};
const permission = (roles: UserRole): any => {
  return (req: Request, res: Response, next: NextFunction): any => {
    if (!req.user.roles) {
      return res.status(403).send({
        message: 'Permission denied',
      });
    }
    if (req.user.roles.includes(UserRole.ADMIN)) {
      return next();
    }
    console.log('permission::', req.user.roles);
    const validPermission = req.user.roles.includes(roles);
    if (!validPermission) {
      return res.status(403).send({
        message: 'Permission denied here',
      });
    }
    console.log(validPermission);

    return next();
  };
};

export { apiKey, permission };
