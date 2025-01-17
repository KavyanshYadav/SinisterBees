import { Router } from 'express';
import passport from 'passport';
import { handlelogin } from '../../libs/authentication/login';
import {
  handleRegistration,
  LoginOptions,
} from '../../libs/authentication/register';

const AuthRouter = Router();

AuthRouter.post('/loginOptions', LoginOptions);
AuthRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

AuthRouter.post('/register', handleRegistration);

AuthRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`http://localhost:5173/`);
  },
);

export default AuthRouter;
