import { createUser, CreateUserInput } from '../../db/Users/UserHandler';

export const handlelogin = async (req, res, next) => {
  // const UserData:CreateUserInput = {
  //     firstName:req.user._json.given_name,
  //     lastName:req.user._json.family_name,
  //     email:req.user._json.email,
  //     Authmode:"google"
  // }
  // createUser(UserData)
  next();
};
