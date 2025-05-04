import express, { Request, Response } from 'express';
import { asyncHandler } from '../../helpers/asyncHandler';
import { TaskControllers } from '../../controllers/task.controller';
import { permission } from '../../auth/checkAuth';
import { PermissionEnum } from '../../models/apikey.model';
import { body } from 'express-validator';
import { authentication } from '../../auth/authUtils';
import { UserRole } from '../../core/const';
const router = express.Router();
router.use(authentication);
router.get('', asyncHandler(TaskControllers.getListTasks));
router.use(permission(UserRole.WRITER));
router.post(
  '',
  [
    body('name').trim().notEmpty().withMessage('Task name must be provied'),
    body('deadline')
      .isISO8601()
      .withMessage('Please provide a valid date and time in ISO 8601 format ')
      .custom((value) => {
        const inputDateTime = new Date(value);
        const currentDateTime = new Date();
        if (inputDateTime < currentDateTime) {
          throw new Error('Date and time must be equal to or greater than now');
        }
        return true;
      }),
    body('createdBy').isMongoId().withMessage('Created id must be valid'),
    body('receiver').isMongoId().withMessage('Receiver id must be valid'),
  ],
  asyncHandler(TaskControllers.createTask)
);

export { router as taskRouter };
