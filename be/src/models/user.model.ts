import mongoose, { Schema } from 'mongoose';

interface UserAttr {
  name: string;
  phone: string;
  password: string;
  address: string;
  roles?: string[];
}
export interface UserDoc extends mongoose.Document {
  name: string;
  phone: string;
  password: string;
  address: string;
  status: string;
  verify: string;
  roles: string[];
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttr): UserDoc;
}
// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 150,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
userSchema.statics.build = (attrs: UserAttr): UserDoc => {
  return new User(attrs);
};
//Export the model
const User = mongoose.model<UserDoc, UserModel>(DOCUMENT_NAME, userSchema);
export { User };
