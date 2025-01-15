import { Router } from 'express';
import { Createuser } from '../../db/Users/UserHandler';
import { UserModel, UserRoleModel } from '../../db/models';
const AuthRouter = Router();

const exampleUser = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@example.com',
  phone: '123-456-7890',
  is_active: true,
};

const createExampleUser = async (req, res) => {
  try {
    const createdUser = await Createuser(exampleUser);
    console.log('User created successfully:', createdUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
  res.send('created');
};

AuthRouter.use('/login', createExampleUser);

export default AuthRouter;
