import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface UserModel {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserAuthModel {
  user_id: number;
  password_hash: string;
  password_salt: string;
  two_factor_secret?: string;
  last_login_at?: Date;
  failed_attempts: number;
  account_locked: boolean;
  password_updated_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface RoleModel {
  role_name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserRoleModel {
  user_id: number;
  role_id: number;
  assigned_at: Date;
}

export interface AuditLogModel {
  user_id: number;
  action: string;
  description?: string;
  performed_by?: number;
  created_at: Date;
}

export interface PreferenceModel {
  user_id: number;
  key: string;
  value: string;
  created_at: Date;
  updated_at: Date;
}
