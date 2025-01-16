import { Router } from 'express';
import { Createuser } from '../../db/Users/UserHandler';
import { UserModel, UserRoleModel } from '../../db/models';
import passport from 'passport';
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
AuthRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
AuthRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log(req.user)
    res.redirect(`http://localhost:5173/`);
  }
);

export default AuthRouter;
