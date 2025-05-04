import { User } from '../models/user.model';

export class UserServices {
  static async findByPhone(
    phone: string,
    select = {
      phone: 1,
      password: 1,
      fullName: 1,
      status: 1,
      roles: 1,
    }
  ) {
    return await User.findOne({ phone: phone, status: 'active' })
      .select(select)
      .lean();
  }
  static async findById(
    id: string,
    select = {
      phone: 1,
      fullName: 1,
      status: 1,
      roles: 1,
    }
  ) {
    return await User.findOne({ _id: id, status: 'active' })
      .select(select)
      .lean();
  }
  static async getListUser(
    select = {
      phone: 1,
      name: 1,
      status: 1,
      roles: 1,
    }
  ) {
    return await User.find({ status: 'active', roles: { $nin: ['ADMIN'] } })
      .select(select)
      .lean();
  }
}
