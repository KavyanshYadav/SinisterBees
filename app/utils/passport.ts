/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { checkUser } from '../db/Users/UserHandler';
import bcrypt from 'bcryptjs';

type GoogleAuthCallback = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any) => void,
) => void;

export const passportGoogleAuth = (fn: GoogleAuthCallback) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void,
      ) => {
        fn(accessToken, refreshToken, profile, done);
      },
    ),
  );
};

export const passportEmailAndPasswordAuth = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        const user = await checkUser({ email });
        if (!user.success) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err);
          if (!isMatch)
            return done(null, false, { message: 'Invalid email or password' });
          return done(null, user);
        });
      },
    ),
  );
};
