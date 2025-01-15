import { User } from '../models/Usermodel';
import { UserModel } from '../models';

export const Createuser = async (userData: UserModel) => {
  try {
    const user = await User.create({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone: userData.phone,
      is_active: userData.is_active,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};
