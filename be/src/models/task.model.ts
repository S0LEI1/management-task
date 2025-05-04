import mongoose, { mongo } from 'mongoose';
import { UserDoc } from './user.model';
enum Status {
  InProgress = 'in-progress',
  New = 'new',
  Complete = 'complete',
}
interface TaskAttr {
  name: string;
  description: string;
  deadline: Date;
  createBy: UserDoc;
  submitTo?: UserDoc;
  receiver: UserDoc;
  steps: string[];
}

export interface TaskDoc extends mongoose.Document {
  name: string;
  description: string;
  deadline: Date;
  createBy: UserDoc;
  submitTo?: UserDoc;
  receiver: UserDoc;
  fileUrl?: string;
  status: string;
  steps?: string[];
  isDeleted: boolean;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attr: TaskAttr): Promise<TaskDoc>;
}
const DOCUMENT_NAME = 'Task';
const COLLECTION_NAME = 'Tasks';
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    fileUrl: {
      type: String,
    },
    steps: {
      type: [String],
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    submitTo: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: Status,
      default: Status.New,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

taskSchema.statics.build = async (attr: TaskAttr): Promise<TaskDoc> => {
  return await new Task(attr).save();
};
const Task = mongoose.model<TaskDoc, TaskModel>(DOCUMENT_NAME, taskSchema);
export { Task };
