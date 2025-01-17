import { Router } from 'express';
import passport from 'passport';
import { handlelogin } from '../../libs/authentication/login';
import {
  handleRegistration,
  LoginOptions,
} from '../../libs/authentication/register';
import { CheckAuthentication } from '../../middleware/CheckAuthentication';
import ApiResponse from '../../libs/ApiRespone';

const AuthRouter = Router();

AuthRouter.post('/loginOptions', LoginOptions);
AuthRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

AuthRouter.post('/register', handleRegistration);

AuthRouter.post('/loginPassword', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      res.json({ message: 'Login successful', token: user });
    });
  })(req, res, next);
});

AuthRouter.get('/getUserSession', CheckAuthentication, (req, res) => {
  res
    .status(200)
    .json(new ApiResponse<Object>(200, 'session found', req.user, ''));
});

AuthRouter.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

AuthRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`http://localhost:5173/`);
  },
);

export default AuthRouter;
