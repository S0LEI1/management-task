import express, { Request, Response } from 'express';
import { AccessController } from '../../controllers/access.controller';
import { asyncHandler } from '../../helpers/asyncHandler';
import { authentication } from '../../auth/authUtils';
import { body } from 'express-validator';
import { validationRequest } from '../../utils/validation-request';
const REGEX_PASSWORD =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
const router = express.Router();
router.post(
  '/signup',
  [
    body('phone').isMobilePhone('vi-VN').withMessage('Phone must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .matches(REGEX_PASSWORD)
      .withMessage(
        'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long'
      ),
    body('name').trim().notEmpty().withMessage('Name must be provied'),
  ],
  validationRequest,
  asyncHandler(AccessController.signUp)
);
router.post('/login', asyncHandler(AccessController.login));
// authencation
router.use(authentication);
// //////////////////////
router.post('/logout', asyncHandler(AccessController.logout));
router.post(
  '/handlerRefreshToken',
  asyncHandler(AccessController.handlerRefreshToken)
);
export { router as accessRouter };
