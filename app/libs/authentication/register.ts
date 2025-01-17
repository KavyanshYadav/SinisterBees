import { NextFunction, Request, Response } from 'express';
import {
  checkUser,
  createUser,
  CreateUserInput,
  getUserAuth,
} from '../../db/Users/UserHandler';
import ApiResponse from '../ApiRespone';
import Joi from 'joi';
import logger from '../../utils/logger';

const loginOptionsSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const LoginOptions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            'Email cannot be empty',
            null,
            'Email is required.',
          ),
        );
    }

    const user = await checkUser({ email });

    if (user.success) {
      const userAuth = await getUserAuth({ email });

      if (userAuth) {
        let loginOptions = ['mail'];

        if (userAuth.user?.password_hash) {
          loginOptions.push('password');
        } else {
          loginOptions = loginOptions.filter((option) => option !== 'password');
        }

        if (userAuth.user?.two_factor_secret) {
          loginOptions.push('2FA');
        }

        if (userAuth.user?.account_locked) {
          return res
            .status(400)
            .json(
              new ApiResponse(
                400,
                'Account is locked',
                null,
                'Please contact support.',
              ),
            );
        }

        return res
          .status(200)
          .json(
            new ApiResponse(200, 'Login options available', { loginOptions }),
          );
      } else {
        return res.status(200).json(
          new ApiResponse(
            200,
            'No authentication details found. Please register.',
            {
              registrationOption: ['password'],
            },
          ),
        );
      }
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(200, 'User not found. Please register.', {
            registrationOption: ['password',"google","X","facebook","apple"],
          }),
        );
    }
  } catch (error) {
    next(error);
  }
};

const registrationValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export const handleRegistration = async (req: Request, res: Response) => {
  try {
    const { error } = registrationValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json(
        new ApiResponse(400, 'Invalid request', null, error.message, {
          type: 'SHOW_NOTIFICATION',
          payload: {
            message: error.message,
          },
        }),
      );
    }
    const { email, password } = req.body;

    // if (!email || !password) {
    //   return res
    //     .status(400)
    //     .json(new ApiResponse(400, 'Email and password are required', null, 'Missing credentials'));
    // }

    const user = await checkUser({ email });
    console.log(user);

    if (user.success) {
      return res
        .status(409)
        .json(
          new ApiResponse(
            409,
            'Email already exists',
            null,
            'Conflict: Email is already registered',
          ),
        );
    }

    const userInput: CreateUserInput = {
      firstName: 'blob',
      lastName: 'blob',
      email: email,
      password: password,
      Authmode: 'email',
    };

    const NewUser = await createUser(userInput);

    if(NewUser){
      req.login(user, (loginErr) => {
        if (loginErr) return res.send(loginErr);
      });
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, 'User registered successfully', {
          userEmail: NewUser.user?.email,
        }),
      );
  } catch (error) {
    logger.error(error);
  }
};
