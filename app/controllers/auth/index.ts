import { Router } from 'express';
import { Createuser } from '../../db/Users/UserHandler';
import { UserModel, UserRoleModel } from '../../db/models';
import passport from 'passport';
import { handlelogin } from '../../libs/authentication/login';
const AuthRouter = Router();

AuthRouter.use('/login', () => {});
AuthRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

AuthRouter.post('/register',()=>{});

AuthRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`http://localhost:5173/`);
  },
);

export default AuthRouter;
