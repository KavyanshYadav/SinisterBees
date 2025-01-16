/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profile } from 'passport-google-oauth20';
import { createUser, CreateUserInput } from '../../db/Users/UserHandler';

export const handleGoogleAuth2 = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any) => void,
) => {
  // console.log(profile.displayName)
  const UserData: CreateUserInput = {
    firstName: profile._json.given_name,
    lastName: profile._json.family_name,
    email: profile._json.email,
    Authmode: 'google',
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  createUser(UserData);
  done(null, profile);
};
