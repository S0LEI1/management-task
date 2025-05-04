import { ReasonStatusCode, StatusCode } from '../core/const';
import { SuccessResponse } from '../core/success.response';
import { TaskService } from '../services/task.service';
import { Request, Response } from 'express';

export class TaskControllers {
  static async createTask(req: Request, res: Response) {
    const { name, description, deadline, submitTo, receiver, steps } = req.body;
    console.log('body::task::', req.body);

    const createdBy = req.user.userId;
    new SuccessResponse(
      'Create task success',
      StatusCode.OK,
      ReasonStatusCode.OK,
      await TaskService.createTask(
        name,
        description,
        deadline,
        createdBy,
        submitTo,
        steps,
        receiver
      )
    ).send(res);
  }
  static async getListTasks(req: Request, res: Response) {
    new SuccessResponse(
      'Get list tasks success',
      StatusCode.OK,
      ReasonStatusCode.OK,
      await TaskService.getListTask(req.params)
    ).send(res);
  }
}
