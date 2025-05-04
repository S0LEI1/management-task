import { UserRole } from '../../core/const';
import { getSelectData } from '../../utils';
import { Task, TaskDoc } from '../task.model';
import { UserDoc } from '../user.model';

export class TaskRepo {
  static async create(
    name: string,
    description: string,
    deadline: Date,
    createBy: UserDoc,
    steps: string[],
    receiver: UserDoc
  ): Promise<TaskDoc> {
    const task = await Task.build({
      name: name,
      description: description,
      deadline: deadline,
      createBy: createBy,
      receiver: receiver,
      steps: steps,
    });
    return task;
  }
  static async getListTasks(
    limit: number,
    sort: string,
    page: number,
    filter = {},
    select: string[]
  ) {
    const skip = (page - 1) * limit;
    return Task.find()
      .populate('createBy', 'name _id')
      .populate('receiver', 'name _id')
      .select(getSelectData(select))
      .skip(skip)
      .limit(limit)
      .lean();
  }
}
