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
      // const passwordHash = hashPassword(password);
      // const passwordSalt = generateSalt();
    }

    await UserAuth.create({
      user_id: newUser.getDataValue('id'),
      //   password_hash: passwordHash,
      //   password_salt: passwordSalt,
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

function generateSalt(): string {
  return Math.random().toString(36).substring(2, 12); // Replace with a secure salt generation method
}
