/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport"
import { Strategy as GoogleStrategy,Profile } from 'passport-google-oauth20';

type GoogleAuthCallback = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void
  ) => void;

export const passportGoogleAuth = (fn:GoogleAuthCallback) =>{
    passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
          },
          (accessToken:string, refreshToken:string, profile:Profile, done: (error: any, user?: any) => void) => {
            fn(accessToken,refreshToken,profile,done);
          }
        )
      );
    
}

