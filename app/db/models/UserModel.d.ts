import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserAuthModel
  extends Model<
    InferAttributes<UserAuthModel>,
    InferCreationAttributes<UserAuthModel>
  > {
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

export interface RoleModel
  extends Model<
    InferAttributes<RoleModel>,
    InferCreationAttributes<RoleModel>
  > {
  id: number;
  role_name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserRoleModel
  extends Model<
    InferAttributes<UserRoleModel>,
    InferCreationAttributes<UserRoleModel>
  > {
  id: number;
  user_id: number;
  role_id: number;
  assigned_at: Date;
}

export interface AuditLogModel
  extends Model<
    InferAttributes<AuditLogModel>,
    InferCreationAttributes<AuditLogModel>
  > {
  id: number;
  user_id: number;
  action: string;
  description?: string;
  performed_by?: number;
  created_at: Date;
}

export interface PreferenceModel
  extends Model<
    InferAttributes<PreferenceModel>,
    InferCreationAttributes<PreferenceModel>
  > {
  id: number;
  user_id: number;
  key: string;
  value: string;
  created_at: Date;
  updated_at: Date;
}
