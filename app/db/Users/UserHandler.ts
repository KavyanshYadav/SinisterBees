import { hashPassword } from '../../utils/encoding';
import { User, UserAuth } from '../models/Usermodel';

export interface CreateUserInput {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  Authmode: 'email' | 'google' | 'github' | 'X' | 'apple' | 'SSO';
  organistaion?: boolean;
}

interface CheckUserInput {
  email: string;
}

interface CreateUserResponse {
  success: boolean;
  message: string;
  user?: object;
}

export async function createUser(
  input: CreateUserInput,
): Promise<CreateUserResponse> {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    accessToken,
    refreshToken,
    Authmode,
    organistaion,
  } = input;

  let pass = {};

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: 'user already exists.',
      };
    }

    const newUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    });

    if (password) {
      pass = await hashPassword(password);
    } else {
      return {
        success: false,
        message: 'password cant be null.',
        user: newUser,
      };
    }

    await UserAuth.create({
      user_id: newUser.getDataValue('id'),
      password_hash: pass.hashPassword,
      password_salt: pass.salt,
      auth_mode: Authmode,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    return {
      success: true,
      message: 'User created successfully.',
      user: newUser,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      message: 'Error creating user.',
    };
  }
}

export async function checkUser(
  input: CheckUserInput,
): Promise<CreateUserResponse> {
  const { email } = input;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return {
        success: true,
        message: 'User exists.',
        user,
      };
    } else {
      return {
        success: false,
        message: 'User does not exist.',
      };
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return {
      success: false,
      message: 'Error checking user.',
    };
  }
}

export async function getUserAuth(
  input: CheckUserInput,
): Promise<CreateUserResponse> {
  const { email } = input;

  try {
    const userResult = await checkUser({ email });

    if (!userResult || !userResult.user) {
      return {
        success: false,
        message: 'User does not exist.',
      };
    }

    const userAuth = await UserAuth.findOne({
      where: { user_id: userResult.user?.id },
    });

    if (!userAuth) {
      return {
        success: false,
        message: 'User authentication data not found.',
      };
    }

    return {
      success: true,
      message: 'User exists.',
      user: userAuth,
    };
  } catch (error) {
    console.error('Error checking user:', error);
    return {
      success: false,
      message: 'An error occurred while checking the user.',
    };
  }
}
