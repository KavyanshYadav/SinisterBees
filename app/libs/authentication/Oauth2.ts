/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profile } from "passport-google-oauth20";

export const handleGoogleAuth2 =(accessToken:string, refreshToken:string, profile:Profile, done: (error: any, user?: any) => void)=>{
    console.log(profile.displayName)
    done(null,profile)
}