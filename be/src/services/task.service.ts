import { NotFoundError } from '@share-package/common';
import { TaskRepo } from '../models/repo/task.repo';
import { UserServices } from './user.service';
import { UserDoc } from '../models/user.model';

export class TaskService {
  static async createTask(
    name: string,
    description: string,
    deadline: Date,
    createdById: string,
    submitToId: string,
    steps: string[],
    receiverId: string
  ) {
    const createdBy = await UserServices.findById(createdById);
    if (!createdBy) throw new NotFoundError('Created User not found');
    const receiverUser = await UserServices.findById(receiverId);
    if (!receiverUser) throw new NotFoundError('receiverUser User not found');
    const task = await TaskRepo.create(
      name,
      description,
      deadline,
      createdBy,
      steps,
      receiverUser
    );
    if (submitToId) {
      const findSubmitTo = await UserServices.findById(submitToId);
      if (!findSubmitTo) throw new NotFoundError('Submit User not found');
      task.set({ submitTo: findSubmitTo });
      await task.save();
    }
    return task;
  }
  static async getListTask({
    limit = 50,
    sort = 'ctime',
    page = 1,
    filter = { isPublish: true },
  }) {
    return await TaskRepo.getListTasks(limit, sort, page, filter, [
      'name',
      'deadline',
      'receiver',
      'createdBy',
      'status',
      'description',
    ]);
  }
}
